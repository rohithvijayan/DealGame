echnology Stack: Next.js (Turbopack), React, Zustand, Framer Motion — deployed on Vercel
  Application Type: Client-side PWA quiz game (no backend API)                                                                                                                                                                                
                                                                                                                                                                                                                                             
  ---                                                                                                                                                                                                                                        
  Executive Summary                                                                                                                                                                                                                          
                                                                                                                                                                                                                                             
  This is a stateless, client-side political quiz game with no backend API or user authentication. Because of that architecture, the highest-impact vulnerabilities are game-logic integrity issues rather than classical web exploits.      
  However, several security header misconfigurations and information-disclosure issues warrant attention.                                                                                                                                    
 
  ---                                                                                                                                                                                                                                        
  Findings        

  🔴 CRITICAL

  ---
  1. Complete Answer Key Exposed in Client-Side JavaScript Bundle
                                                                                                                                                                                                                                             
  File: /_next/static/chunks/09w988p-91ooj.js
  Impact: Game integrity completely broken                                                                                                                                                                                                    
                 
  The entire game dataset — all 50+ politician names, IDs, aliases, and answer-matching logic — is hardcoded in the JavaScript bundle. Any player can open browser DevTools, read the bundle, and know every correct answer before playing.  
                 
  Exposed data includes:                                                                                                                                                                                                                      
  - All politician objects (name, id, aliases used for answer matching)
  - The partial-match validation algorithm (≥4 character matches accepted)                                                                                                                                                                    
  - The Zustand store structure including score fields                    
                                                                                                                                                                                                                                             
  Proof: The answer validation function matches guesses against name.toLowerCase() and a flat alias list. Example aliases are all visible in plain text.                                                                                      
                                                                                                                                                                                                                                             
  Recommendation: If game integrity matters, move question selection and answer validation to a server-side API route. Serve only the current round's clue to the client; validate guesses server-side.                                      
                                                                                                                                                                                                                                             
  ---                                                                                                                                                                                                                                        
  2. Score Fully Manipulable via localStorage
                                                                                                                                                                                                                                             
  localStorage key: congress-bjp-deal-storage
  Impact: Any score can be fabricated                                                                                                                                                                                                        
                 
  The Zustand game store is persisted directly to localStorage. The stored state contains:                                                                                                                                                    
  score, streak, maxStreak, currentRound, sessionDefectors,
  completedIds, skippedIds, isGameComplete                                                                                                                                                                                                    
                                                                                                                                                                                                                                             
  Any player can open DevTools console and run:                                                                                                                                                                                              
  localStorage.setItem('congress-bjp-deal-storage', JSON.stringify({                                                                                                                                                                          
    state: { score: 10, streak: 10, maxStreak: 10, isGameComplete: true },                                                                                                                                                                    
    version: 0                                                            
  }))                                                                                                                                                                                                                                        
  ...then navigate to the results page to display a perfect score.
                                                                                                                                                                                                                                             
  Recommendation: If score sharing/leaderboards are ever added, scores must be computed and signed server-side. For the current share-only UX, add a disclaimer that scores are self-reported. Consider using a cryptographic HMAC to at least
   make forgery non-trivial.                                                                                                                                                                                                                  
                                                                                                                                                                                                                                             
  ---                                                                                                                                                                                                                                        
  🟠 HIGH        

  ---
  3. Content-Security-Policy Missing Critical Directives
                                                       
  Header observed:
  content-security-policy: frame-ancestors 'none'; object-src 'none'; base-uri 'self';                                                                                                                                                        
                                                                                     
  What's missing: The CSP has no script-src, style-src, connect-src, img-src, font-src, or default-src directives. This means:                                                                                                                
                                                                                                                                                                                                                                             
  - If any XSS vulnerability were found, attackers could freely load and execute arbitrary external scripts                                                                                                                                  
  - inline-script execution is unrestricted                                                                                                                                                                                                  
  - No protection against data exfiltration via connect-src                                                                                                                                                                                  
                                                                                                                                                                                                                                             
  Additionally, all <script> tags render with nonce="$undefined" (literally the string $undefined or no nonce), confirming nonce-based CSP is not implemented.                                                                                
                                                                                                                                                                                                                                             
  Recommendation: Add at minimum:                                                                                                                                                                                                            
  default-src 'self';
  script-src 'self' 'nonce-{random}';                                                                                                                                                                                                        
  style-src 'self' 'unsafe-inline';  
  connect-src 'self';                                                                                                                                                                                                                        
  img-src 'self' data: blob:;
  font-src 'self';                                                                                                                                                                                                                            
                                                                                                                                                                                                                                             
  ---
  4. Overly Permissive CORS — Wildcard on All Routes                                                                                                                                                                                          
                                                                                                                                                                                                                                             
  Header observed on all routes including HTML pages:
  access-control-allow-origin: *                                                                                                                                                                                                              
                               
  This applies not just to static assets (where * is acceptable) but to all HTML page responses. While the current app has no sensitive backend data, this is a poor baseline and could become a problem if authenticated API routes are added
   in the future.                                                                                                                                                                                                                            
                                                                                                                                                                                                                                             
  Recommendation: Restrict Access-Control-Allow-Origin on page routes to the canonical origin (https://thecongressbjpdeal.com). The * wildcard is acceptable only for truly public static assets.                                            
                 
  ---                                                                                                                                                                                                                                        
  5. Unauthenticated Results Page Accepts Arbitrary Session IDs
                                                               
  Route: /results/[sessionId]
  Observed behavior:                                                                                                                                                                                                                          
 
  ┌──────────────┬─────────────┐                                                                                                                                                                                                              
  │  Session ID  │ HTTP Status │
  ├──────────────┼─────────────┤                                                                                                                                                                                                              
  │ 0            │ 200         │
  ├──────────────┼─────────────┤                                                                                                                                                                                                              
  │ abc          │ 200         │
  ├──────────────┼─────────────┤
  │ 999999999999 │ 200         │
  └──────────────┴─────────────┘

  Session IDs are generated client-side as Date.now() timestamps (e.g., "/results/${Date.now()}"), making them:                                                                                                                              
  - Predictable — attackable within a brute-force time window
  - Unauthenticated — the server never verifies that a session actually occurred                                                                                                                                                              
                                                                               
  The page renders with score: 0/10 for unknown sessions (because score data lives in localStorage), so currently there's no IDOR data leak. However, the architecture is fragile for any future server-side session storage.                
                                                                                                                                                                                                                                             
  Recommendation: If sessions are ever stored server-side, use cryptographically random UUIDs instead of timestamps, and verify ownership before rendering session data.                                                                      
                                                                                                                                                                                                                                             
  ---                                                                                                                                                                                                                                        
  🟡 MEDIUM      
                                                                                                                                                                                                                                             
  ---
  6. Missing Security Headers                                                                                                                                                                                                                
                 
  The following defensive headers are absent:

  ┌───────────────────────────────────┬───────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────────┐                                                                        
  │              Header               │                                       Risk                                        │              Recommendation              │
  ├───────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────┤                                                                        
  │ Cross-Origin-Opener-Policy        │ Missing same-origin isolates the browsing context from cross-origin popup attacks │ Add COOP: same-origin                    │
  ├───────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────┤
  │ Cross-Origin-Embedder-Policy      │ Missing require-corp prevents Spectre-class side-channel leaks                    │ Add COEP: require-corp                   │                                                                        
  ├───────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────┤                                                                        
  │ Cross-Origin-Resource-Policy      │ Static assets served with * CORS don't set CORP                                   │ Add CORP: cross-origin for public assets │                                                                        
  ├───────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────┤                                                                        
  │ X-Permitted-Cross-Domain-Policies │ Controls Flash/PDF cross-domain policies                                          │ Add none                                 │
  └───────────────────────────────────┴───────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────────────────┘                                                                        
                 
  Good headers already present (no action needed):                                                                                                                                                                                            
  - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload ✅
  - X-Content-Type-Options: nosniff ✅                                                                                                                                                                                                        
  - X-Frame-Options: DENY ✅          
  - Referrer-Policy: strict-origin-when-cross-origin ✅                                                                                                                                                                                      
  - Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=() ✅
                                                                                                                                                                                                                                             
  ---
  7. Infrastructure & Technology Fingerprinting via Response Headers                                                                                                                                                                          
                                                                                                                                                                                                                                             
  Every response leaks:
  server: Vercel                                                                                                                                                                                                                              
  x-vercel-id: bom1::swvl4-...
  x-vercel-cache: HIT        
  x-nextjs-prerender: 1                                                                                                                                                                                                                      
  x-matched-path: /results/[sessionId]
                                                                                                                                                                                                                                             
  This reveals the hosting platform (Vercel), CDN cache status, Next.js framework, and internal routing patterns. Attackers can tailor exploits to known Vercel/Next.js CVEs.                                                                
                                                                                                                                                                                                                                             
  Recommendation: Use Vercel's custom headers configuration to suppress or replace server, and consider whether x-matched-path needs to be public.                                                                                            
                                                                                                                                                                                                                                             
  ---                                                                                                                                                                                                                                        
  8. dangerouslySetInnerHTML Used in Two Locations
                                                                                                                                                                                                                                             
  Found in the JS bundle:
  1. JSON-LD structured data injection — dangerouslySetInnerHTML:{__html: JSON.stringify(schemaData)} — low risk as the content is developer-controlled and static                                                                            
  2. Next.js 404 error page inline CSS — standard Next.js boilerplate, low risk                                                                                                                                                              
                                                                               
  Neither is currently exploitable, but both should be documented and audited if data sources ever become dynamic or user-influenced.                                                                                                        
                                                                                                                                                                                                                                             
  ---                                                                                                                                                                                                                                        
  9. Dynamic Blob Worker Creation                                                                                                                                                                                                            
                                 
  In 12udg45_ei18..js:
  new Worker(URL.createObjectURL(new Blob([t])))                                                                                                                                                                                              
  This creates a web worker from a dynamically generated blob. While currently used for the confetti animation and appears safe, it bypasses script-src CSP restrictions (blob: workers are often exempt). If t ever contained
  attacker-influenced data, this would be an XSS vector.                                                                                                                                                                                      
                                                                                                                                                                                                                                             
  ---
  🔵 LOW / INFORMATIONAL                                                                                                                                                                                                                      
                                                                                                                                                                                                                                             
  ---
  10. Canonical URL Mismatch                                                                                                                                                                                                                  
                           
  - Deployed at: https://deal-game-sigma.vercel.app
  - Canonical, sitemap, og:url all reference: https://thecongressbjpdeal.com                                                                                                                                                                  
                                                                                                                                                                                                                                             
  Users accessing the Vercel URL bypass canonical SEO consolidation. More importantly, the Vercel URL may not have the same security headers or policies as the production domain if they diverge.                                            
                                                                                                                                                                                                                                             
  Recommendation: Add a redirect rule in vercel.json to force all traffic from deal-game-sigma.vercel.app to thecongressbjpdeal.com.                                                                                                          
                 
  ---                                                                                                                                                                                                                                        
  11. Path Traversal Correctly Blocked (Positive Finding)
                                                                                                                                                                                                                                             
  GET /results/../etc/passwd  → 403 Forbidden
                                                                                                                                                                                                                                             
  Vercel's platform correctly handles directory traversal attempts with a 403. No action needed.                                                                                                                                              
 
  ---                                                                                                                                                                                                                                        
  12. No Cookies, No Tracking (Positive Finding)
                                               
  The application sets zero cookies and has zero third-party trackers (no Google Analytics, no Meta Pixel, no session cookies). This is an exemplary privacy-by-default posture for a game with no user accounts.
                                                                                                                                                                                                                                             
  ---
  Summary Table                                                                                                                                                                                                                              
                 
  ┌─────┬────────────────────────────────────────────┬─────────────┬───────────────┐
  │  #  │                  Finding                   │  Severity   │ Effort to Fix │                                                                                                                                                          
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤
  │ 1   │ Answer key exposed in JS bundle            │ 🔴 Critical │ High          │                                                                                                                                                          
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤
  │ 2   │ Score manipulation via localStorage        │ 🔴 Critical │ Medium        │                                                                                                                                                          
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤
  │ 3   │ CSP missing script-src and most directives │ 🟠 High     │ Low           │                                                                                                                                                          
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤                                                                                                                                                          
  │ 4   │ Wildcard CORS on HTML page routes          │ 🟠 High     │ Low           │
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤                                                                                                                                                          
  │ 5   │ Results page accepts arbitrary session IDs │ 🟠 High     │ Medium        │
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤                                                                                                                                                          
  │ 6   │ Missing COOP/COEP/CORP headers             │ 🟡 Medium   │ Low           │
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤                                                                                                                                                          
  │ 7   │ Server/infrastructure header leakage       │ 🟡 Medium   │ Low           │
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤                                                                                                                                                          
  │ 8   │ dangerouslySetInnerHTML usage              │ 🟡 Medium   │ Low           │
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤                                                                                                                                                          
  │ 9   │ Dynamic blob worker bypasses CSP           │ 🟡 Medium   │ Low           │
  ├─────┼────────────────────────────────────────────┼─────────────┼───────────────┤                                                                                                                                                          
  │ 10  │ Canonical URL mismatch                     │ 🔵 Low      │ Low           │
  └─────┴────────────────────────────────────────────┴─────────────┴───────────────┘                                                                                                                                                          
 
  ---                                                                                                                                                                                                                                        
  Priority Remediation Recommendations
                                     
  1. Immediate (CSP): Add a proper Content-Security-Policy with default-src 'self' and script-src 'self'. This is a one-line change in vercel.json headers configuration and provides the most broad-spectrum XSS protection.
  2. Short-term (Score integrity): If score sharing is a feature goal, implement a server-side API route that computes and signs scores using HMAC. This prevents leaderboard fraud without a full auth system.                              
  3. Short-term (CORS): Scope Access-Control-Allow-Origin to https://thecongressbjpdeal.com on HTML routes.                                                                                                                                  
  4. Short-term (Headers): Add Cross-Origin-Opener-Policy: same-origin and suppress verbose server/x-vercel-* headers via vercel.json.                                                                                                        
  5. Long-term (Game integrity): Move answer validation to a server-side Next.js API Route handler. The client should send a guess; the server returns correct/incorrect. This is the only way to truly protect answer keys.  
Warm regards,