import 'server-only';
import type { DefectorDisplay } from '@/types/game';

export interface Defector extends DefectorDisplay {
    name: string;
    aliases: string[];
}

export function toDisplay(d: Defector): DefectorDisplay {
    const { name: _name, aliases: _aliases, ...display } = d;
    return display;
}

export const defectors: Defector[] = [
    {
        id: "jyotiraditya-scindia",
        name: "Jyotiraditya Scindia",
        aliases: ["Scindia", "Jyotiraditya", "Maharaja", "Mahadev"],
        position: "MP / Former Union Minister",
        state: "Madhya Pradesh",
        year: 2020,
        outcome: "Union Minister (Civil Aviation, Communications)",
        clue: "A scion of the Gwalior royal dynasty and once the most loyal soldier of the Gandhi family, this leader spent nearly two decades building Congress's youth base. His departure in March 2020 triggered the fall of the Kamal Nath government and was accompanied by 22 loyal MLAs, sending shockwaves across the party.",
        hints: [
            "He hails from a royal family whose dynasty name is also his surname.",
            "He was passed over for the Chief Ministership of his home state multiple times.",
            "His exit in 2020 brought down the Congress government in MP."
        ],
        difficulty: 1,
        photo_url: "/politicians/jyotiraditya-scindia.jpg",
        source_url: "https://www.thehindu.com/news/national/jyotiraditya-scindia-joins-bjp/article31038478.ece"
    },
    {
        id: "himanta-biswa-sarma",
        name: "Himanta Biswa Sarma",
        aliases: ["Himanta", "HBS", "Sarma", "Hemanta"],
        position: "MLA / Minister in Assam",
        state: "Assam",
        year: 2015,
        outcome: "Chief Minister of Assam (since 2021)",
        clue: "Once the most powerful political organiser in northeastern India under the Congress banner, this leader claims his exit was triggered by a humiliating episode involving a party leader's pet dog. After crossing over in 2015, he became the architect of BJP's dominance across eight northeastern states.",
        hints: [
            "He famously blamed a dog for his exodus from Congress.",
            "He was a key aide to Tarun Gogoi for over a decade.",
            "He is now the Chief Minister of a northeastern state."
        ],
        difficulty: 1,
        photo_url: "/politicians/himanta-biswa-sarma.jpg",
        source_url: "https://www.indiatoday.in/india/story/himanta-biswa-sarma-joins-bjp-2015-northeast-1801026-2021-05-10"
    },
    {
        id: "chaudhary-birendra-singh",
        name: "Chaudhary Birendra Singh",
        aliases: ["Birendra Singh", "Chaudhary Birendra"],
        position: "MP (Rajya Sabha)",
        state: "Haryana",
        year: 2014,
        outcome: "Union Cabinet Minister under Modi Govt",
        clue: "A veteran Jat leader from Haryana with decades of Congress service, this former Rajya Sabha MP crossed over just as the Modi wave was cresting in 2014. He was rewarded swiftly with a Union Cabinet berth, becoming one of the first high-profile defectors to be formally absorbed into the BJP's ministerial setup.",
        hints: [
            "He belongs to the Jat community, a dominant caste in his state.",
            "He was a Rajya Sabha MP when he defected.",
            "He was given a Cabinet post by Modi almost immediately."
        ],
        difficulty: 3,
        photo_url: "/politicians/chaudhary-birendra-singh.jpg",
        source_url: "https://www.ndtv.com/india-news/chaudhary-birendra-singh-joins-bjp-550023"
    },
    {
        id: "rao-inderjit-singh",
        name: "Rao Inderjit Singh",
        aliases: ["Rao Inderjit", "Inderjit Singh"],
        position: "MP (Lok Sabha)",
        state: "Haryana",
        year: 2014,
        outcome: "Union Minister of State",
        clue: "A multi-term Lok Sabha MP from the Gurugram belt, this Haryana leader quietly shifted his allegiance in 2014 after long-standing frustrations with the Congress high command. His Ahir community backing made him a valuable asset for BJP in southern Haryana, and he was soon elevated to a Union Ministry of State post.",
        hints: [
            "He represents the Ahir community in his region.",
            "He has won from the same constituency for multiple terms.",
            "He was given a Union Minister of State role by the Modi government."
        ],
        difficulty: 3,
        photo_url: "/politicians/rao-inderjit-singh.jpg",
        source_url: "https://www.hindustantimes.com/india/rao-inderjit-singh-joins-bjp/story-FpaqXLi0XcxJt8dWriIVGO.html"
    },
    {
        id: "satpal-maharaj",
        name: "Satpal Maharaj",
        aliases: ["Satpal", "Maharaj"],
        position: "MP / Minister",
        state: "Uttarakhand",
        year: 2014,
        outcome: "Cabinet Minister in Uttarakhand BJP Govt",
        clue: "A spiritual leader turned politician, this Uttarakhand figure had been a Congress MP before switching sides amid the 2014 Modi wave. His religious stature gave him a distinct voter base, and post-defection he secured a Cabinet berth in the Uttarakhand BJP government.",
        hints: [
            "He is also known as a spiritual guru with a large ashram following.",
            "He served as a Congress MP from Uttarakhand.",
            "He became a Cabinet Minister in Uttarakhand after joining BJP."
        ],
        difficulty: 3,
        photo_url: "/politicians/satpal-maharaj.jpg",
        source_url: "https://www.ndtv.com/india-news/satpal-maharaj-joins-bjp-504821"
    },
    {
        id: "girdhar-gamang",
        name: "Girdhar Gamang",
        aliases: ["Gamang", "Girdhar"],
        position: "Former Chief Minister",
        state: "Odisha",
        year: 2015,
        outcome: "Later returned to Congress",
        clue: "One of Odisha's most prominent tribal leaders, this former Chief Minister defected to the BJP in 2015 after decades with Congress. His departure was seen as a blow to Congress's tribal outreach in Odisha. He later returned to Congress, making him one of the few 'deals' that was undone.",
        hints: [
            "He was the Chief Minister of an eastern state.",
            "He belongs to the Scheduled Tribe community.",
            "He is notable for eventually returning to Congress."
        ],
        difficulty: 4,
        photo_url: "/politicians/girdhar-gamang.jpg",
        source_url: "https://www.thehindu.com/news/national/other-states/girdhar-gamang-joins-bjp/article7060038.ece"
    },
    {
        id: "rita-bahuguna-joshi",
        name: "Rita Bahuguna Joshi",
        aliases: ["Rita Bahuguna", "Joshi", "Rita Joshi"],
        position: "UPCC President / MLA",
        state: "Uttar Pradesh",
        year: 2016,
        outcome: "Won Assembly and Lok Sabha seats for BJP",
        clue: "Daughter of a revered former Chief Minister, this Congress leader spent years as the President of the Uttar Pradesh Congress Committee. Her defection just before the 2017 UP elections was a strategic blow to the grand old party. She later won an Assembly seat and a Lok Sabha seat under the BJP banner.",
        hints: [
            "She is the daughter of a former UP Chief Minister.",
            "She led the UPCC for several years.",
            "She switched just before the 2017 UP Assembly elections."
        ],
        difficulty: 2,
        photo_url: "/politicians/rita-bahuguna-joshi.jpg",
        source_url: "https://www.ndtv.com/india-news/rita-bahuguna-joshi-joins-bjp-1476683"
    },
    {
        id: "pema-khandu",
        name: "Pema Khandu",
        aliases: ["Khandu", "Pema"],
        position: "Chief Minister",
        state: "Arunachal Pradesh",
        year: 2016,
        outcome: "Continued as CM under BJP",
        clue: "An entire assembly contingent switched sides when this Chief Minister, along with 43 MLAs, moved from Congress to a smaller party and then to the BJP, all while staying in power as Chief Minister. It was one of the most sweeping mass defections in Indian parliamentary history.",
        hints: [
            "He is the Chief Minister of a northeastern state bordering China.",
            "He brought over 40 MLAs with him when he defected.",
            "His father was also a politician in the same state."
        ],
        difficulty: 2,
        photo_url: "/politicians/pema-khandu.jpg",
        source_url: "https://www.thehindu.com/news/national/other-states/arunachal-cm-pema-khandu-joins-bjp-with-43-legislators/article17238862.ece"
    },
    {
        id: "n-biren-singh",
        name: "N. Biren Singh",
        aliases: ["Biren Singh", "N. Biren", "Nongthombam Biren"],
        position: "MLA",
        state: "Manipur",
        year: 2016,
        outcome: "BJP Chief Minister of Manipur (since 2017)",
        clue: "Once a sports journalist and then a Congress MLA, this leader from the hills of the northeast defected to the BJP in 2016, sensing a shift in his state's political winds. He went on to lead the BJP to victory in Manipur, becoming the first BJP Chief Minister of the state.",
        hints: [
            "He was formerly a sports journalist and footballer.",
            "He is from Manipur.",
            "He became BJP's first Chief Minister of his state."
        ],
        difficulty: 3,
        photo_url: "/politicians/n-biren-singh.jpg",
        source_url: "https://www.ndtv.com/india-news/n-biren-singh-joins-bjp-1387753"
    },
    {
        id: "nd-tiwari",
        name: "N.D. Tiwari",
        aliases: ["Narayan Dutt Tiwari", "ND Tiwari", "Tiwari"],
        position: "Former Chief Minister",
        state: "Uttarakhand / UP",
        year: 2016,
        outcome: "Joined before 2017 elections; passed away 2018",
        clue: "One of India's longest-serving politicians, this octogenarian former Chief Minister of two different states stunned the political world when he crossed over at the twilight of his career. His son followed him into politics. He passed away in 2018 shortly after his defection.",
        hints: [
            "He was Chief Minister of two different states at different points in his career.",
            "He joined BJP in his late 80s.",
            "He passed away in 2018, about a year after joining."
        ],
        difficulty: 2,
        photo_url: "/politicians/nd-tiwari.jpg",
        source_url: "https://www.livemint.com/Politics/oMZiYmHMSJ8c1sEFoaedTN/ND-Tiwari-joins-BJP.html"
    },
    {
        id: "sm-krishna",
        name: "S.M. Krishna",
        aliases: ["SM Krishna", "Somanahalli Mallaiah Krishna", "Krishna"],
        position: "Former CM / Union External Affairs Minister",
        state: "Karnataka",
        year: 2017,
        outcome: "Largely ceremonial role in BJP",
        clue: "A former Governor of Maharashtra, Chief Minister of Karnataka, and External Affairs Minister under the UPA, this distinguished statesman joined the BJP at an advanced age. Long associated with Congress, his defection was seen as one of the most symbolic ideological crossovers of the decade.",
        hints: [
            "He was Karnataka's Chief Minister in the late 1990s.",
            "He served as External Affairs Minister under the UPA.",
            "He was also the Governor of Maharashtra."
        ],
        difficulty: 2,
        photo_url: "/politicians/sm-krishna.jpeg",
        source_url: "https://www.thehindu.com/news/national/sm-krishna-joins-bjp/article19044266.ece"
    },
    {
        id: "vijay-bahuguna",
        name: "Vijay Bahuguna",
        aliases: ["Bahuguna", "Vijay"],
        position: "Former Chief Minister",
        state: "Uttarakhand",
        year: 2017,
        outcome: "Son Saurabh later won on BJP ticket",
        clue: "A former Chief Minister of a Himalayan state who faced severe criticism for his government's handling of a major natural disaster, this Congress leader eventually defected to the BJP in 2017. His son subsequently contested and won on a BJP ticket, cementing the family's transition.",
        hints: [
            "His government was widely criticized for the 2013 floods disaster response.",
            "He is a former Chief Minister of Uttarakhand.",
            "His son Saurabh also became a BJP leader."
        ],
        difficulty: 3,
        photo_url: "/politicians/vijay-bahuguna.jpg",
        source_url: "https://www.ndtv.com/india-news/vijay-bahuguna-joins-bjp-1853462"
    },
    {
        id: "tom-vadakkan",
        name: "Tom Vadakkan",
        aliases: ["Vadakkan", "Tom"],
        position: "Congress National Spokesperson",
        state: "Kerala",
        year: 2019,
        outcome: "BJP National Spokesperson",
        clue: "A well-known face on prime-time TV debates, this Congress spokesperson from a minority community in Kerala shocked viewers when he crossed the floor just before the 2019 elections. His defection was particularly optics-sensitive given his community's traditional Congress alignment. He became a BJP spokesperson soon after.",
        hints: [
            "He is a Christian Congress spokesperson from Kerala.",
            "He was a regular panelist on national TV channels.",
            "He joined BJP just before the 2019 Lok Sabha elections."
        ],
        difficulty: 3,
        photo_url: "/politicians/tom-vadakkan.jpg",
        source_url: "https://www.ndtv.com/india-news/tom-vadakkan-joins-bjp-1999025"
    },
    {
        id: "ap-abdullakutty",
        name: "A.P. Abdullakutty",
        aliases: ["Abdullakutty", "AP Abdullakutty"],
        position: "Former MP",
        state: "Kerala",
        year: 2019,
        outcome: "BJP National VP; Hajj Committee Chairman",
        clue: "A former Congress MP from Kerala's Muslim community, this leader defected in 2019 and was elevated to the post of National Vice President of the BJP. His appointment as Hajj Committee Chairman was an effort by BJP to present a diverse face. He represents a dramatic example of minority crossover politics.",
        hints: [
            "He is a Muslim leader from Kerala.",
            "He became a National Vice President of the BJP.",
            "He was made the Chairman of the Hajj Committee."
        ],
        difficulty: 4,
        photo_url: "/politicians/ap-abdullakutty.jpeg",
        source_url: "https://www.thehindu.com/news/national/kerala/abdullakutty-joins-bjp/article26440555.ece"
    },
    {
        id: "bhubaneswar-kalita",
        name: "Bhubaneswar Kalita",
        aliases: ["Kalita", "Bhubaneswar"],
        position: "Rajya Sabha MP",
        state: "Assam",
        year: 2019,
        outcome: "Resigned from RS to join BJP",
        clue: "This Rajya Sabha MP from Assam resigned his parliamentary seat, citing his opposition to the Congress's stance on the Citizenship Amendment Act, before formally joining the BJP. His exit highlighted the internal rift within the party over ethnic identity and citizenship politics in the northeast.",
        hints: [
            "He resigned from Rajya Sabha before joining BJP.",
            "His stated reason was opposition to Congress's CAA stance.",
            "He is from Assam."
        ],
        difficulty: 4,
        photo_url: "/politicians/bhubaneswar-kalita.jpeg",
        source_url: "https://www.ndtv.com/india-news/bhubaneswar-kalita-resigns-from-rajya-sabha-joins-bjp-2075013"
    },
    {
        id: "n-kiran-kumar-reddy",
        name: "N. Kiran Kumar Reddy",
        aliases: ["Kiran Kumar Reddy", "Kiran Reddy"],
        position: "Former Chief Minister",
        state: "Andhra Pradesh",
        year: 2019,
        outcome: "Joined BJP before LS elections",
        clue: "The last Chief Minister of undivided Andhra Pradesh, this leader had resigned in protest against the bifurcation of the state in 2014, showing initial independence from the Congress line. He joined the BJP in 2019, seeking political rehabilitation in the newly carved-out state he once led.",
        hints: [
            "He was the last Chief Minister of undivided Andhra Pradesh.",
            "He resigned from Congress in 2014 over state bifurcation.",
            "He joined BJP in 2019 ahead of Lok Sabha elections."
        ],
        difficulty: 3,
        photo_url: "/politicians/n-kiran-kumar-reddy.jpg",
        source_url: "https://www.thehindu.com/news/national/andhra-pradesh/kiran-kumar-reddy-joins-bjp/article26741944.ece"
    },
    {
        id: "radha-krishna-vikhe-patil",
        name: "Radha Krishna Vikhe Patil",
        aliases: ["Vikhe Patil", "Radha Krishna"],
        position: "Leader of Opposition, Maharashtra",
        state: "Maharashtra",
        year: 2019,
        outcome: "Minister in Fadnavis BJP Govt",
        clue: "The Leader of the Opposition in the Maharashtra Assembly, this powerful Ahmednagar strongman crossed over to the BJP in 2019. His defection was engineered partly through his son, who had already joined the BJP and was given a ticket. He was subsequently inducted as a minister in the Devendra Fadnavis cabinet.",
        hints: [
            "He was Maharashtra's Leader of the Opposition when he defected.",
            "His son had joined BJP before him.",
            "He is from the sugar belt of Ahmednagar."
        ],
        difficulty: 3,
        photo_url: "/politicians/radha-krishna-vikhe-patil.jpeg",
        source_url: "https://www.ndtv.com/india-news/radhakrishna-vikhe-patil-joins-bjp-days-after-son-ashutosh-gets-bjp-ticket-2033459"
    },
    {
        id: "khushbu-sundar",
        name: "Khushbu Sundar",
        aliases: ["Khushbu", "Kushboo"],
        position: "National Spokesperson",
        state: "Tamil Nadu",
        year: 2020,
        outcome: "BJP National Spokesperson",
        clue: "A former Tamil film actress turned politician, this Congress national spokesperson quit after years of association with the party and joined the BJP. She had earlier been with the DMK and AIADMK before her Congress stint, making her political trajectory one of the most colourful in Tamil Nadu.",
        hints: [
            "She is a well-known Tamil film actress.",
            "She had previously been with the DMK.",
            "She became BJP's spokesperson for Tamil Nadu."
        ],
        difficulty: 2,
        photo_url: "/politicians/khushbu-sundar.jpg",
        source_url: "https://www.thehindu.com/news/national/actress-politician-khushbu-sundar-joins-bjp/article32735700.ece"
    },
    {
        id: "jitin-prasada",
        name: "Jitin Prasada",
        aliases: ["Jitin", "Prasada"],
        position: "MP / Former Union MoS",
        state: "Uttar Pradesh",
        year: 2021,
        outcome: "Minister in UP Govt; won Pilibhit LS 2024",
        clue: "From a prominent political family — his father was a senior Union Minister under Rajiv Gandhi — this young Congress leader and former Minister of State was considered a rising Brahmin face of the party. He defected to the BJP in 2021 ahead of the Uttar Pradesh elections, and was immediately rewarded with a ministerial role in the Yogi cabinet.",
        hints: [
            "His father was a Cabinet Minister under Rajiv Gandhi.",
            "He represented a constituency in UP's Rohilkhand region.",
            "He won the Pilibhit Lok Sabha seat for BJP in 2024."
        ],
        difficulty: 2,
        photo_url: "/politicians/jitin-prasada.jpg",
        source_url: "https://www.ndtv.com/india-news/jitin-prasada-joins-bjp-2452965"
    },
    {
        id: "rpn-singh",
        name: "R.P.N. Singh",
        aliases: ["RPN Singh", "Ratanjit Pratap Narain Singh", "Raja of Padrauna"],
        position: "MP / Former Union MoS",
        state: "Uttar Pradesh",
        year: 2022,
        outcome: "Joined ahead of UP Assembly elections",
        clue: "Known in political circles as the 'Raja of Padrauna', this former Minister of State under Manmohan Singh belonged to the inner circle of Rahul Gandhi's close confidants. He defected just days before the 2022 Uttar Pradesh Assembly elections while still listed as a Congress star campaigner, creating a public embarrassment for the party.",
        hints: [
            "He belongs to a royal family in eastern UP.",
            "He was a Union Minister of State for Home Affairs.",
            "He defected while still listed as a Congress star campaigner."
        ],
        difficulty: 3,
        photo_url: "/politicians/rpn-singh.jpeg",
        source_url: "https://www.hindustantimes.com/india-news/rpn-singh-joins-bjp-101643105740428.html"
    },
    {
        id: "hardik-patel",
        name: "Hardik Patel",
        aliases: ["Hardik", "Patel", "Patidar leader"],
        position: "Working President, Gujarat Congress",
        state: "Gujarat",
        year: 2022,
        outcome: "Joined BJP ahead of Gujarat elections",
        clue: "Once the firebrand face of the Patidar reservation agitation who had taken on the Modi government with mass rallies, this Gujarat leader eventually joined the Congress before crossing over to the BJP less than two years later. His defection on the eve of the 2022 Gujarat elections was seen as devastating for the opposition.",
        hints: [
            "He led the Patidar reservation movement in Gujarat.",
            "He was jailed briefly during his initial activism.",
            "He joined the Congress before then joining the BJP."
        ],
        difficulty: 1,
        photo_url: "/politicians/hardik-patel.avif",
        source_url: "https://www.thehindu.com/news/national/hardik-patel-joins-bjp/article65484042.ece"
    },
    {
        id: "kuldeep-bishnoi",
        name: "Kuldeep Bishnoi",
        aliases: ["Bishnoi", "Kuldeep"],
        position: "MLA",
        state: "Haryana",
        year: 2022,
        outcome: "Cross-voted for BJP RS candidate; formally joined",
        clue: "Son of a former Haryana Chief Minister and founder of his own political party that later merged with Congress, this MLA turned the tables dramatically by cross-voting for the BJP's Rajya Sabha candidate despite being a Congress legislator. He then formally joined the BJP, ending his family party's association with Congress.",
        hints: [
            "He is the son of former Haryana CM Bhajan Lal.",
            "He cross-voted in Rajya Sabha elections as a Congress MLA.",
            "His father had founded the party that then merged with Congress."
        ],
        difficulty: 3,
        photo_url: "/politicians/kuldeep-bishnoi.jpg",
        source_url: "https://www.ndtv.com/india-news/kuldeep-bishnoi-joins-bjp-3221609"
    },
    {
        id: "sunil-jakhar",
        name: "Sunil Jakhar",
        aliases: ["Jakhar", "Sunil"],
        position: "Former State Congress Chief",
        state: "Punjab",
        year: 2022,
        outcome: "Became BJP Punjab State President",
        clue: "The former President of the Punjab Pradesh Congress Committee, this leader from a Hindu Jat family became increasingly sidelined as the Congress focused on Sikh leadership in the state. Following his party's loss in Punjab in 2022 and subsequent internal friction, he crossed over to the BJP and was named the state party president.",
        hints: [
            "He was once the head of the Punjab Pradesh Congress Committee.",
            "He lost out on a key post due to caste politics within Congress.",
            "He became the BJP's Punjab state unit chief."
        ],
        difficulty: 3,
        photo_url: "/politicians/sunil-jakhar.jpeg",
        source_url: "https://www.ndtv.com/india-news/sunil-jakhar-joins-bjp-3129039"
    },
    {
        id: "capt-amarinder-singh",
        name: "Capt. Amarinder Singh",
        aliases: ["Amarinder Singh", "Captain Sahib", "Punjab CM"],
        position: "Former Chief Minister of Punjab",
        state: "Punjab",
        year: 2022,
        outcome: "Merged Punjab Lok Congress with BJP",
        clue: "A former Indian Army officer and the Chief Minister of Punjab who was ousted in a palace coup orchestrated by his own party, this leader formed his own political outfit before merging it with the BJP ahead of the 2022 elections. His decades-long feud with a senior Congress colleague played out humiliatingly in public.",
        hints: [
            "He is a former Army officer who served in the 1965 war.",
            "He was pushed out as Punjab CM by his own party in 2021.",
            "He had a very public feud with Navjot Singh Sidhu."
        ],
        difficulty: 1,
        photo_url: "/politicians/capt-amarinder-singh.webp",
        source_url: "https://www.thehindu.com/news/national/amarinder-singh-merges-plc-with-bjp/article65059984.ece"
    },
    {
        id: "digambar-kamat",
        name: "Digambar Kamat",
        aliases: ["Kamat", "Digambar"],
        position: "Former Chief Minister of Goa",
        state: "Goa",
        year: 2022,
        outcome: "Joined BJP with other Congress MLAs",
        clue: "This former Goa Chief Minister took a publicized oath before three places of worship — a temple, a mosque, and a church — promising not to defect after winning the 2022 elections. Within months, he and seven other Congress MLAs switched to the BJP, citing a divine instruction as reason for breaking the oath.",
        hints: [
            "He is a former Chief Minister of Goa.",
            "He took a multi-faith oath promising not to defect, then defected.",
            "He said 'God told me to' when asked about the switch."
        ],
        difficulty: 2,
        photo_url: "/politicians/digambar-kamat.jpg",
        source_url: "https://www.thequint.com/news/politics/god-told-me-to-join-bjp-digambar-kamat-on-defection"
    },
    {
        id: "ashok-tanwar",
        name: "Ashok Tanwar",
        aliases: ["Tanwar", "Ashok"],
        position: "Former Haryana PCC Chief",
        state: "Haryana",
        year: 2023,
        outcome: "Contested 2024 LS polls for BJP (lost)",
        clue: "A Dalit leader and former President of the Haryana Pradesh Congress Committee, this leader left the party after a prolonged public falling out with the state's veteran Congress chief. His departure was marked by a dramatic public spat and press conferences where he raised questions about Congress's internal democracy.",
        hints: [
            "He is a Dalit leader from Haryana.",
            "He publicly feuded with Bhupinder Singh Hooda.",
            "He was the Haryana Congress chief before defecting."
        ],
        difficulty: 3,
        photo_url: "/politicians/ashok-tanwar.jpeg",
        source_url: "https://www.ndtv.com/india-news/ashok-tanwar-joins-bjp-3968099"
    },
    {
        id: "anil-antony",
        name: "Anil Antony",
        aliases: ["Anil Antony", "Antony junior"],
        position: "Leader (son of A.K. Antony)",
        state: "Kerala",
        year: 2023,
        outcome: "BJP National Spokesperson; lost LS 2024",
        clue: "The son of one of Congress's most respected elder statesmen — a former Union Defence Minister and three-time Chief Minister — this leader defected to the BJP over what he called his views on national security. His defection was particularly symbolic given his father's stature as a towering Congress dignitary in Kerala.",
        hints: [
            "His father is a highly respected former Defence Minister.",
            "His father is a three-time Chief Minister of Kerala.",
            "He is from Kerala and lost the 2024 LS election for BJP."
        ],
        difficulty: 3,
        photo_url: "/politicians/anil-antony.webp",
        source_url: "https://www.thehindu.com/news/national/kerala/anil-antony-joins-bjp/article66393050.ece"
    },
    {
        id: "ashok-chavan",
        name: "Ashok Chavan",
        aliases: ["Chavan", "Ashok Shankarrao Chavan"],
        position: "Former Chief Minister (2-time)",
        state: "Maharashtra",
        year: 2024,
        outcome: "Nominated to Rajya Sabha by BJP",
        clue: "A two-time Chief Minister of Maharashtra who had been forced to resign over the Adarsh Housing Society scam, this veteran Nanded strongman joined the BJP in an emotional press conference in 2024, ending a decades-long family legacy with the Congress. He was promptly nominated to the Rajya Sabha.",
        hints: [
            "He resigned as Maharashtra CM due to the Adarsh scam.",
            "He is a two-time former Chief Minister of Maharashtra.",
            "His family has been in Congress for generations."
        ],
        difficulty: 2,
        photo_url: "/politicians/ashok-chavan.jpg",
        source_url: "https://www.ndtv.com/india-news/ashok-chavan-joins-bjp-nominated-to-rajya-sabha-5197821"
    },
    {
        id: "padmaja-venugopal",
        name: "Padmaja Venugopal",
        aliases: ["Padmaja", "K. Karunakaran's daughter"],
        position: "Leader (daughter of K. Karunakaran)",
        state: "Kerala",
        year: 2024,
        outcome: "Joined BJP ahead of elections",
        clue: "The daughter of K. Karunakaran — one of Kerala's most towering political figures and a former Chief Minister — this leader had long been associated with Congress before joining the BJP in 2024. Her defection was seen as a symbolic blow in a state where the Karunakaran family's political lineage runs deep.",
        hints: [
            "Her father is a legendary former Chief Minister of Kerala.",
            "She hails from a deeply Congress-rooted political family.",
            "She joined BJP in 2024 ahead of elections."
        ],
        difficulty: 4,
        photo_url: "/politicians/padmaja-venugopal.avif",
        source_url: "https://www.thehindu.com/news/national/kerala/padmaja-venugopal-joins-bjp/article67916802.ece"
    },
    {
        id: "ravneet-singh-bittu",
        name: "Ravneet Singh Bittu",
        aliases: ["Bittu", "Ravneet Bittu"],
        position: "MP (Lok Sabha, 3-time)",
        state: "Punjab",
        year: 2024,
        outcome: "Fielded from Ludhiana; lost LS 2024",
        clue: "The grandson of a former Punjab Chief Minister who was assassinated, this three-time Lok Sabha MP was once hailed as a youthful Congress face for Punjab. He defected to the BJP in 2024 despite his family's deep anti-BJP sentiments, citing his grandfather's legacy as justification for going with the ruling dispensation.",
        hints: [
            "His grandfather was a Punjab CM who was assassinated in the 1980s.",
            "He was a three-term Lok Sabha MP from Ludhiana.",
            "He joined BJP in 2024 shortly before Lok Sabha elections."
        ],
        difficulty: 2,
        photo_url: "/politicians/ravneet-singh-bittu.jpg",
        source_url: "https://www.thehindu.com/news/national/ravneet-bittu-joins-bjp/article68001854.ece"
    },
    {
        id: "preneet-kaur",
        name: "Preneet Kaur",
        aliases: ["Preneet", "Amarinder's wife"],
        position: "MP (wife of Capt. Amarinder Singh)",
        state: "Punjab",
        year: 2024,
        outcome: "Fielded from Patiala; lost LS 2024",
        clue: "A former Union Minister and Lok Sabha MP from Patiala, this leader is the wife of a former Punjab Chief Minister who had already merged his party with the BJP. She formally joined the BJP in 2024 and was fielded from her stronghold of Patiala, though she lost the election, signalling the limits of the political transition.",
        hints: [
            "She is the wife of a former Punjab Chief Minister.",
            "She was a former Union Minister of State for External Affairs.",
            "She was fielded from Patiala in the 2024 LS elections."
        ],
        difficulty: 3,
        photo_url: "/politicians/preneet-kaur.jpg",
        source_url: "https://www.ndtv.com/india-news/preneet-kaur-joins-bjp-5190931"
    },
    {
        id: "jagdambika-pal",
        name: "Jagdambika Pal",
        aliases: ["Jagdambika", "Pal"],
        position: "Former CM / MP",
        state: "Uttar Pradesh",
        year: 2004,
        outcome: "Headed Joint Parliamentary Committee on Waqf Bill",
        clue: "This former MP from Uttar Pradesh famously claimed to be the Chief Minister of his state for less than two days in 1998 before the courts reversed the decision. He eventually migrated from Congress to the BJP and rose to chair a significant Parliamentary Committee tasked with reviewing a contentious religious endowment bill.",
        hints: [
            "He claimed to be UP CM for just one or two days in 1998.",
            "He is a former BJP Lok Sabha MP from Uttar Pradesh.",
            "He chaired the Parliament committee on the Waqf Amendment Bill."
        ],
        difficulty: 3,
        photo_url: "/politicians/jagdambika-pal.webp",
        source_url: "https://www.thehindu.com/news/national/politics-and-policy/jagdambika-pal-joins-bjp/article5164963.ece"
    },
    {
        id: "alpesh-thakor",
        name: "Alpesh Thakor",
        aliases: ["Alpesh", "Thakor"],
        position: "MLA (Radhanpur)",
        state: "Gujarat",
        year: 2019,
        outcome: "Won Gandhinagar South on BJP ticket in 2022",
        clue: "A mobiliser of the OBC Thakor community in Gujarat, this leader rode to prominence on a campaign against alcohol and drugs, joining the Congress ahead of the 2017 elections and winning a seat. He crossed over to the BJP in 2019 after Congress reportedly failed to fulfil promises, and later won a different constituency on a BJP ticket.",
        hints: [
            "He is an OBC leader from the Thakor community.",
            "He ran an anti-drugs and anti-liquor campaign before entering politics.",
            "He joined and then left Congress within two years."
        ],
        difficulty: 4,
        photo_url: "/politicians/alpesh-thakor.jpeg",
        source_url: "https://www.thehindu.com/news/national/alpesh-thakor-joins-bjp/article27991918.ece"
    },
    {
        id: "aditi-singh",
        name: "Aditi Singh",
        aliases: ["Aditi", "Rae Bareli MLA"],
        position: "MLA (Rae Bareli)",
        state: "Uttar Pradesh",
        year: 2022,
        outcome: "Formally joined BJP after supporting it while in Congress",
        clue: "An MLA from Rae Bareli — arguably Congress's most symbolic stronghold — this leader caused outrage within her party when she repeatedly attended BJP events and boycotted Congress sessions. She formally switched after the 2022 UP elections. Her defection from Congress's heartland was especially symbolically potent.",
        hints: [
            "She is an MLA from Rae Bareli — Sonia Gandhi's constituency.",
            "She kept attending BJP events while still in the Congress.",
            "She formally joined BJP after the 2022 UP elections."
        ],
        difficulty: 3,
        photo_url: "/politicians/aditi-singh.jpg",
        source_url: "https://www.ndtv.com/india-news/aditi-singh-joins-bjp-2723649"
    },
    {
        id: "krishna-tirath",
        name: "Krishna Tirath",
        aliases: ["Tirath", "Krishna"],
        position: "Former Union Minister (WCD)",
        state: "Delhi",
        year: 2015,
        outcome: "Joined BJP; limited role afterwards",
        clue: "A former Minister for Women and Child Development under the UPA government, this Delhi leader had a moderate profile within Congress before switching sides in 2015. She was considered a face of women's political representation in the capital, and her defection was another early indicator of post-2014 Congress attrition.",
        hints: [
            "She was the Union Minister for Women and Child Development.",
            "She is a Congress leader from Delhi.",
            "She joined BJP in 2015 with limited impact on her political career."
        ],
        difficulty: 4,
        photo_url: "/politicians/krishna-tirath.jpg",
        source_url: "https://www.ndtv.com/india-news/krishna-tirath-joins-bjp-766419"
    },
    {
        id: "naveen-jindal",
        name: "Naveen Jindal",
        aliases: ["Jindal", "Naveen"],
        position: "Former MP (Kurukshetra)",
        state: "Haryana",
        year: 2024,
        outcome: "Won Kurukshetra LS 2024 on BJP ticket",
        clue: "Known as the man who won the legal right to fly the Indian national flag at his home after a prolonged court battle, this industrialist-politician from Haryana's steel belt crossed over from Congress to the BJP in 2024 and immediately won his Lok Sabha seat, demonstrating his enduring local dominance.",
        hints: [
            "He won a Supreme Court case giving citizens the right to fly the national flag.",
            "He is a leading industrialist in the Indian steel sector.",
            "He won the Kurukshetra Lok Sabha seat for BJP in 2024."
        ],
        difficulty: 2,
        photo_url: "/politicians/naveen-jindal.jpg",
        source_url: "https://www.thehindu.com/news/national/naveen-jindal-joins-bjp/article68001782.ece"
    },
    {
        id: "jyoti-mirdha",
        name: "Jyoti Mirdha",
        aliases: ["Mirdha", "Jyoti"],
        position: "Former MP (Nagaur)",
        state: "Rajasthan",
        year: 2024,
        outcome: "Contested Nagaur for BJP in 2024 LS (lost)",
        clue: "The granddaughter of a towering Jat political figure from Rajasthan, this Congress MP broke with the party and joined the BJP before the 2024 elections. She was fielded from Nagaur, her family's traditional stronghold, but lost the seat. Her defection reflected the broader erosion within the Congress's Rajasthan unit.",
        hints: [
            "She is the granddaughter of a prominent Rajasthan Jat leader.",
            "She was fielded from Nagaur by the BJP in 2024.",
            "She is a former Congress MP from Rajasthan."
        ],
        difficulty: 4,
        photo_url: "/politicians/jyoti-mirdha.jpeg",
        source_url: "https://www.ndtv.com/india-news/jyoti-mirdha-joins-bjp-5097813"
    },
    {
        id: "suresh-pachouri",
        name: "Suresh Pachouri",
        aliases: ["Pachouri", "Panchouri"],
        position: "Former Union MoS (Defence)",
        state: "Madhya Pradesh",
        year: 2024,
        outcome: "Left Congress after 52 years; joined BJP",
        clue: "After more than five decades in Congress, this former Union Minister of State for Defence from Madhya Pradesh quit the party, marking one of the most pointed departures of the 2024 election cycle. His exit at such an advanced stage of his political career underlined how far the party's organisational base had fractured.",
        hints: [
            "He was with Congress for over 50 years before defecting.",
            "He served as Union Minister of State for Defence.",
            "He is from Madhya Pradesh."
        ],
        difficulty: 4,
        photo_url: "/politicians/suresh-pachouri.jpg",
        source_url: "https://www.ndtv.com/india-news/suresh-pachouri-joins-bjp-congress-52-years-5098821"
    },
    {
        id: "pradeep-balmuchu",
        name: "Pradeep Balmuchu",
        aliases: ["Balmuchu", "Pradeep"],
        position: "Former Speaker / RS MP",
        state: "Jharkhand",
        year: 2019,
        outcome: "Joined BJP; limited role afterwards",
        clue: "A former Speaker of the Jharkhand Assembly and a Rajya Sabha MP, this Scheduled Tribe leader from Jharkhand gradually drifted away from Congress circles and joined the BJP. His defection stripped Congress of a credible tribal face in a state where SC/ST representation is politically crucial.",
        hints: [
            "He was a former Speaker of the Jharkhand Legislative Assembly.",
            "He is a Scheduled Tribe leader.",
            "He was later elected to the Rajya Sabha under BJP."
        ],
        difficulty: 5,
        photo_url: "/politicians/pradeep-balmuchu.jpg",
        source_url: "https://www.ndtv.com/india-news/pradeep-balmuchu-joins-bjp-2115819"
    },
    {
        id: "narayan-rane",
        name: "Narayan Rane",
        aliases: ["Rane", "Narayan"],
        position: "Former CM (via Shiv Sena, then Congress)",
        state: "Maharashtra",
        year: 2019,
        outcome: "Union MSME Minister; won Ratnagiri LS 2024",
        clue: "A former Chief Minister of Maharashtra who had passed through Shiv Sena and Congress before landing with the BJP, this Konkan strongman has the rare distinction of having led all three major political formations in Maharashtra at some point. He was elevated to the Union Cabinet as Minister for MSME.",
        hints: [
            "He is a former Chief Minister of Maharashtra.",
            "He has been associated with Shiv Sena, Congress, and BJP.",
            "He was made the Union Minister for MSME."
        ],
        difficulty: 2,
        photo_url: "/politicians/narayan-rane.jpg",
        source_url: "https://www.ndtv.com/india-news/narayan-rane-joins-bjp-2057043"
    },
    {
        id: "yashpal-arya",
        name: "Yashpal Arya",
        aliases: ["Yashpal", "Arya"],
        position: "Former Speaker, Uttarakhand Assembly",
        state: "Uttarakhand",
        year: 2016,
        outcome: "Joined BJP; later returned to Congress in 2022",
        clue: "A former Speaker of the Uttarakhand Legislative Assembly and a prominent Dalit Congress leader, this politician joined the BJP in 2016 in what appeared to be a clean break. However, he reversed course in 2022 ahead of state elections, returning to Congress along with his son — one of the rare defection reversals of the decade.",
        hints: [
            "He was the Speaker of the Uttarakhand Assembly.",
            "He is a prominent Dalit leader in Uttarakhand.",
            "He returned to Congress in 2022 after a stint with BJP."
        ],
        difficulty: 4,
        photo_url: "/politicians/yashpal-arya.jpg",
        source_url: "https://www.ndtv.com/india-news/yashpal-arya-returns-to-congress-with-son-uttarakhand-2576617"
    },
    {
        id: "pawan-kumar-kajal",
        name: "Pawan Kumar Kajal",
        aliases: ["Kajal", "Pawan Kajal"],
        position: "MLA / Congress Working Committee",
        state: "Himachal Pradesh",
        year: 2022,
        outcome: "Joined BJP ahead of HP Assembly elections",
        clue: "A member of the Congress Working Committee and an MLA from Himachal Pradesh, this leader joined the BJP ahead of the 2022 Assembly elections. His defection was part of a series of Congress exits in Himachal that threatened the party's preparation for the critical hill state contest.",
        hints: [
            "He was a member of the all-powerful Congress Working Committee.",
            "He is an MLA from Himachal Pradesh.",
            "He joined BJP ahead of the 2022 Himachal Assembly elections."
        ],
        difficulty: 5,
        photo_url: "/politicians/pawan-kumar-kajal.jpeg",
        source_url: "https://www.ndtv.com/india-news/congress-mla-joins-bjp-himachal-elections-3310419"
    },
    {
        id: "harsh-mahajan",
        name: "Harsh Mahajan",
        aliases: ["Mahajan", "Harsh"],
        position: "State Congress Working President",
        state: "Himachal Pradesh",
        year: 2022,
        outcome: "Joined BJP; won RS seat in 2024",
        clue: "The Working President of the Himachal Pradesh Congress Committee, this leader switched to the BJP in 2022 and was later rewarded with a Rajya Sabha nomination in 2024 — a classic example of how defectors are absorbed and compensated within the party's upper house nomination system.",
        hints: [
            "He was the Working President of Himachal Pradesh Congress.",
            "He joined BJP in 2022.",
            "He was rewarded with a Rajya Sabha seat in 2024."
        ],
        difficulty: 5,
        photo_url: "/politicians/harsh-mahajan.jpg",
        source_url: "https://www.ndtv.com/india-news/harsh-mahajan-wins-rajya-sabha-seat-himachal-5400121"
    },
    {
        id: "gajendra-singh-rajukhedi",
        name: "Gajendra Singh Rajukhedi",
        aliases: ["Rajukhedi", "Gajendra Singh"],
        position: "Former 3-time MP (Dhar)",
        state: "Madhya Pradesh",
        year: 2024,
        outcome: "Tribal leader; joined BJP with Pachouri",
        clue: "A three-time former Member of Parliament from the Scheduled Tribe seat of Dhar in Madhya Pradesh, this Congress veteran crossed over alongside another senior Congress leader in 2024. His move was significant due to his tribal community standing in a state with a sizeable Adivasi voter base.",
        hints: [
            "He is a three-time former MP from Dhar.",
            "He is from the Scheduled Tribe community in MP.",
            "He defected alongside Suresh Pachouri in 2024."
        ],
        difficulty: 5,
        photo_url: "/politicians/gajendra-singh-rajukhedi.jpeg",
        source_url: "https://www.ndtv.com/india-news/gajendra-singh-rajukhedi-joins-bjp-madhya-pradesh-5098831"
    },
    {
        id: "lalitesh-pati-tripathi",
        name: "Lalitesh Pati Tripathi",
        aliases: ["Lalitesh", "Tripathi"],
        position: "Youth leader / scion",
        state: "Uttar Pradesh",
        year: 2021,
        outcome: "Joined BJP from Congress",
        clue: "The grandson of a legendary former Chief Minister of Uttar Pradesh and a former Union Minister, this young Congress leader from the Tripathi Brahmin political dynasty joined the BJP in 2021. His decision to switch sides marked the end of an era for one of UP's most storied political lineages within Congress.",
        hints: [
            "He is the grandson of former UP CM Kamalapati Tripathi.",
            "He belongs to the Brahmin community in UP.",
            "He joined BJP in 2021 ahead of UP elections."
        ],
        difficulty: 4,
        photo_url: "/politicians/lalitesh-pati-tripathi.jpg",
        source_url: "https://www.ndtv.com/india-news/lalitesh-pati-tripathi-joins-bjp-2498171"
    },
    {
        id: "ravi-kishan",
        name: "Ravi Kishan",
        aliases: ["Ravi Kishan", "Ravikishan"],
        position: "Actor / Congress supporter",
        state: "Uttar Pradesh",
        year: 2017,
        outcome: "Won Gorakhpur LS seat for BJP (2019, 2024)",
        clue: "A popular Bhojpuri film actor who had previously campaigned for Congress and was associated with the party, this entertainer-turned-politician crossed over and contested from Gorakhpur on a BJP ticket, eventually winning two consecutive Lok Sabha elections from a seat long associated with the Gorakhnath Mutt.",
        hints: [
            "He is a famous Bhojpuri film actor.",
            "He had previously campaigned for Congress before switching.",
            "He won the Gorakhpur LS seat for BJP in 2019 and 2024."
        ],
        difficulty: 3,
        photo_url: "/politicians/ravi-kishan.jpg",
        source_url: "https://www.ndtv.com/entertainment/bhojpuri-actor-ravi-kishan-joins-bjp-1998611"
    },
    {
        id: "pradyut-bordoloi",
        name: "Pradyut Bordoloi",
        aliases: ["Bordoloi", "Pradyut"],
        position: "MP (Lok Sabha, 2-time)",
        state: "Assam",
        year: 2026,
        outcome: "Given BJP ticket for Dispur Assembly seat",
        clue: "A two-term Lok Sabha MP from Nowgong who served on several parliamentary committees, this Assam Congress leader crossed over to the BJP in 2026 and was given a ticket from the state capital's constituency, Dispur. His move reflected the systematic disintegration of Congress's organizational base in Assam.",
        hints: [
            "He is a two-time MP from Nowgong in Assam.",
            "He was given the BJP ticket for the Dispur Assembly constituency.",
            "He defected in 2026."
        ],
        difficulty: 5,
        photo_url: "/politicians/pradyut-bordoloi.jpg",
        source_url: "https://www.thehindu.com/news/national/pradyut-bordoloi-joins-bjp/article68001854.ece"
    },
    {
        id: "bhupen-kumar-borah",
        name: "Bhupen Kumar Borah",
        aliases: ["Borah", "Bhupen Borah"],
        position: "Former Assam PCC President",
        state: "Assam",
        year: 2026,
        outcome: "Given BJP ticket for Bihpuria Assembly seat",
        clue: "The outgoing President of the Assam Pradesh Congress Committee, this leader's defection to the BJP in 2026 was a dramatic blow to the state party just ahead of Assembly elections. He was immediately rewarded with a BJP ticket from Bihpuria, signalling how thoroughly Congress's organizational leadership in Assam had been hollowed out.",
        hints: [
            "He was the President of the Assam Pradesh Congress Committee.",
            "He defected with other senior Congress leaders in 2026.",
            "He was given a BJP ticket for the Bihpuria constituency."
        ],
        difficulty: 4,
        photo_url: "/politicians/bhupen-kumar-borah.jpg",
        source_url: "https://www.thehindu.com/news/national/assam/bhupen-kumar-borah-joins-bjp/article68001855.ece"
    },
    {
        id: "sanjay-patil",
        name: "Sanjay Patil",
        aliases: ["Patil", "Sanjay"],
        position: "MP (Lok Sabha)",
        state: "Maharashtra",
        year: 2019,
        outcome: "Joined BJP",
        clue: "A Lok Sabha MP from Maharashtra who switched his allegiance to the BJP before the 2019 elections, this leader is from the politically competitive sugar cooperative belt of the state. His defection was one of several Maharashtra Congress crossovers that helped consolidate the BJP's dominance in the state.",
        hints: [
            "He is a Congress MP from Maharashtra.",
            "He is from the sugar belt region of his state.",
            "He joined BJP ahead of the 2019 Lok Sabha elections."
        ],
        difficulty: 5,
        photo_url: "/politicians/Sanjay Patil.jpeg",
        source_url: "https://www.ndtv.com/india-news/sanjay-patil-joins-bjp-maharashtra-2020841"
    },
    {
        id: "om-prakash-pahadia",
        name: "Om Prakash Pahadia",
        aliases: ["Pahadia", "Om Prakash"],
        position: "Son of Jagannath Pahadia (former CM)",
        state: "Rajasthan",
        year: 2024,
        outcome: "Joined BJP ahead of LS elections",
        clue: "The son of a former Chief Minister and former Governor, this Rajasthan leader carried a significant political legacy into the BJP when he crossed over in 2024. His father once led the state as Chief Minister and was subsequently appointed Governor of Haryana, making this a case of a political dynasty's next generation switching sides entirely.",
        hints: [
            "His father was the Chief Minister of Rajasthan.",
            "His father later became the Governor of Haryana.",
            "He joined BJP ahead of the 2024 Lok Sabha elections."
        ],
        difficulty: 5,
        photo_url: "/politicians/Om Prakash Pahadia.webp",
        source_url: "https://www.ndtv.com/india-news/om-prakash-pahadia-joins-bjp-rajasthan-5097831"
    },
];
