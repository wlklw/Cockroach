// js/data.js

const DATA = [
    // 鼈蠊屬
    {genus:"Therea", species:"olegrandjeani", latin:"Therea olegrandjeani", cn:"問號蜚蠊", stock: "in-stock", appearance: "斑點", price: 450, pack: 6, features:"黑底翅面中央白色問號狀斑紋", origin:"印度", habit:"此物種為地棲性，幼蟲與成蟲都會將大部分時間埋藏在底材中。成年雄性有時會爬到地表的樹枝上活動 。雌性將卵鞘直接產在底材中，孵化時間約需三到五個月", diet:"高蛋白犬/貓/雞飼料、水果、昆蟲果凍", temp:"24–30°C；60–80%（需乾濕分明）", diff:2, tags:["現貨","新手+"], info:"需提供濕度梯度以避免脫皮不良", img:"images/IMG20181211214008.jpg"},
    {genus:"Therea", species:"bernhardti", latin:"Therea bernhardti", cn:"多米諾骨牌蜚蠊", stock: "in-stock", appearance: "斑點", price: 450, pack: 6, features:"黑底白圓斑，似骨牌", origin:"印度", habit:"此物種為地棲性，幼蟲與成蟲都會將大部分時間埋藏在底材中。成年雄性有時會爬到地表的樹枝上活動 。雌性將卵鞘直接產在底材中，孵化時間約需三到五個月。", diet:"高蛋白犬/貓/雞飼料、水果、昆蟲果凍", temp:"24–30°C；60–70%", diff:1, tags:["現貨","新手友善"], info:"適應性強，對環境要求低", img:"images/IMG_9342.JPG"},
    {genus:"Therea", species:"regularis", latin:"Therea regularis", cn:"多米諾橘骨牌蜚蠊", stock: "in-stock", appearance: "斑點", price: 700, pack: 6, features:"黑底搭配橘白斑，對比強烈", origin:"印度", habit:"此物種為地棲性，幼蟲與成蟲都會將大部分時間埋藏在底材中。成年雄性有時會爬到地表的樹枝上活動 。雌性將卵鞘直接產在底材中，孵化時間約需三到五個月", diet:"高蛋白犬/貓/雞飼料、水果、昆蟲果凍", temp:"24–30°C；60–70%", diff:1, tags:["現貨","新手友善"], info:"容錯率高，新手適合", img:"images/IMG_9157.JPG"},
    {genus:"Therea", species:"cf_irreperta", latin:"Therea cf. irreperta", cn:"Therea cf. irreperta", stock: "out-of-stock", appearance: "斑點", size: "medium", features:"黑底對稱橘斑，與橘骨牌相似", origin:"印度", habit:" 屬於地棲性物種，日間潛伏於底材中，夜間才會出來活動 。此物種在同屬中較為特殊，因為雌雄兩性皆具備相對較長的翅膀，且有飛行能力", diet:"高蛋白犬/貓/雞飼料、水果、昆蟲果凍", temp:"24–30°C；需乾濕交界區", diff:2, tags:["缺貨"], info:"底材濕度控制重要", img:"images/IMG_9483.jpeg"},
    // 瓷蠊屬
    {genus:"Gyna", species:"caffrorum", latin:"Gyna caffrorum", cn:"卡佛爾瓷蠊", stock: "in-stock", appearance: "質感", price: 300, pack: 6, features:"淡米至淺棕翅，細緻斑紋", origin:"南非", habit:"成蟲具備攀爬光滑表面和飛行的能力，但牠們更喜歡將時間花在底材下，幼蟲則完全無法攀爬光滑表面", diet:"雜食性，高蛋白飼料、蔬果、落葉", temp:"24–28°C；60–70%", diff:1, tags:["現貨","新手友善"], info:"生命週期穩定、適應力佳", img:"images/Snapseed.jpg"},
    {genus:"Gyna", species:"centurio", latin:"Gyna centurio", cn:"百夫長瓷蠊", stock: "in-stock", appearance: "質感", price: 400, pack: 6, features:"雌雄二型明顯，雄米白、雌深褐斑為主", origin:"非洲中部", habit:"成蟲同樣具備攀爬光滑表面和飛行的能力，但相較於卡佛爾瓷蠊，本種速度較慢", diet:"雜食性，高蛋白飼料、蔬果、落葉", temp:"24–28°C；60–70%", diff:1, tags:["現貨","新手友善"], info:"繁殖容易，環境要求低", img:"images/IMG_7931.JPG"},
    // 馬島群
    {genus:"Princisia", species:"vanwaerebeki", latin:"Princisia vanwaerebeki", cn:"巨人馬島蜚蠊", stock: "out-of-stock", appearance: "無翅不會飛", features:"大型黑至深棕，空間足可達8公分", origin:"馬達加斯加", habit:"雄性頭胸背板有誇張的突起，類似三角龍的頭飾，用於在競爭中推擠其他雄性以確立交配權，為卵胎生，雌性會在體內孵化卵鞘後產下活體幼蟲", diet:"廣泛雜食，蔬果、高蛋白飼料、肉類等 ", temp:"27°C 以上；70–80% 高濕且通風佳", diff:3, tags:["缺貨"], info:"需保持濕度與通風平衡及大空間", img:"images/IMG_9453.JPG"},
    {genus:"Elliptorhina", species:"chopardi", latin:"Elliptorhina chopardi", cn:"侏儒馬島蜚蠊", stock: "out-of-stock", appearance: "無翅不會飛", features:"最小馬島，<4 公分，橙褐與黑相間", origin:"馬達加斯加", habit:"為卵胎生，雌性會在體內孵化卵鞘後產下活體幼蟲", diet:"廣泛雜食，蔬果、高蛋白飼料、肉類等 ", temp:"24–28°C；70–80%", diff:2, tags:["缺貨"], info:"需穩定濕度與通風", img:"images/IMG_7399.JPG"},
    {genus:"Aeluropoda", species:"insignis", latin:"Aeluropoda insignis", cn:"紅平板馬島蜚蠊", stock: "out-of-stock", appearance: "無翅不會飛", features:"紅褐色平板狀、扁平化", origin:"馬達加斯加", habit:"其極度扁平的體型使其能夠有效地藏匿於狹窄的縫隙中，為卵胎生，雌性會在體內孵化卵鞘後產下活體幼蟲", diet:"雜食性，偏好蔬果，亦取食高蛋白飼料 ", temp:"24–28°C；65–75%", diff:2, tags:["缺貨"], info:"需穩定濕度與隱蔽空間", img:"images/IMG_9450.JPG"},
    // 金屬蠊屬
    {genus:"Pseudoglomeris", species:"magnifica", latin:"Pseudoglomeris magnifica", cn:"越南金屬蜚蠊", stock: "out-of-stock", appearance: "金屬反光", features:"金綠金屬光澤，極為華麗", origin:"越南 Cuc Phuong（產地型）", habit:"罕見的日行性蜚蠊，在白天會活躍地四處探索和覓食。為樹棲性物種，能夠攀爬光滑的表面，成年雄性有翅膀，能夠飛行，而雌性則無翅", diet:"水果、花粉、昆蟲果凍、高蛋白飼料", temp:"24–27°C；50-70%（需通風）", diff:4, tags:["缺貨"], info:"需新鮮蔬果補充", img:"images/IMG_7950.JPG"},
    // 紺蠊屬
    {genus:"Eucorydia", species:"dasytoides", latin:"Eucorydia dasytoides", cn:"帶紋绀蠊", stock: "out-of-stock", appearance: "金屬反光", features:"亮藍金屬色翼帶黃條", origin:"東南亞（含臺灣部分）", habit:"成年雄性飛行能力佳，具有訪花行為，但壽命較短。雌蟲和若蟲多躲藏於樹皮裂縫或腐木之中", diet:"成蟲食花粉性，取食花粉、水果；幼蟲雜食", temp:"24–27°C；70–80%", diff:3, tags:["缺貨"], info:"生命週期長，成蟲期短；雄蟲需供應花粉", img:"images/IMG_7960.JPG"},
    {genus:"Eucorydia", species:"yasumatsui", latin:"Eucorydia yasumatsui", cn:"安松氏绀蠊", stock: "out-of-stock", appearance: "金屬反光", features:"藍黑金屬光澤翅", origin:"日本琉球群島", habit:"成年雄性飛行能力佳，具有訪花行為，但壽命較短。雌蟲和若蟲多躲藏於樹皮裂縫或腐木之中", diet:"成蟲食花粉性，取食花粉、水果；幼蟲雜食", temp:"24–27°C；70–80%", diff:3, tags:["缺貨"], info:"生命週期長，成蟲期短；雄蟲需供應花粉"},
    // 犀牛
    {genus:"Macropanesthia", species:"rhinoceros", latin:"Macropanesthia rhinoceros", cn:"犀牛蜚蠊", stock: "out-of-stock", appearance: "無翅不會飛", features:"世界上最重的蜚蠊；重要營養循環者；有複雜親代撫育行為", origin:"澳洲昆士蘭", habit:"以挖掘永久性地下洞穴而聞名，洞穴深度可達一公尺。雄性會使用其鏟狀的頭部盾牌在洞口與其他雄性打鬥，以捍衛領地。此物種有獨特的親代撫育行為，雌性會產下活體幼蟲並照顧其長達數月", diet:"乾燥桉樹葉為主，輔以蘋果、狗糧、蔬果", temp:"22–26°C；60–75%（厚底材可挖）", diff:5, tags:["缺貨","進階"], info:"生長周期極長、食材有特定需求", img:"images/IMG_9456.JPG"}
];

const genusOrder = [
    "Therea","Gyna","Princisia","Elliptorhina","Aeluropoda","Pseudoglomeris","Eucorydia","Macropanesthia"
];

export { DATA, genusOrder };
