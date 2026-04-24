export interface StoryImage {
  url: string;
  alt: string;
  caption?: string;
}

// 段落ID → 图片映射
export const paragraphImages: Record<string, StoryImage> = {
  // 第一章：石神的早晨
  'p1-1': { url: '/images/41_日历上的日期.png', alt: '日历上的日期', caption: '每天早上七点三十五分，准时出门' },
  'p1-2': { url: '/images/42_高中教职员办公室.png', alt: '高中教职员办公室', caption: '清澄庭园公园前的私立高中，石神教数学' },
  'p1-3': { url: '/images/01_石神走过隅田川.png', alt: '石神走过隅田川' },
  'p1-5': { url: '/images/02_新大桥下的游民聚落.png', alt: '新大桥下的游民聚落' },
  'p1-6': { url: '/images/03_弁天亭便当店.png', alt: '弁天亭便当店' },
  'p1-7': { url: '/images/04_花冈靖子_便当店女主人.png', alt: '花冈靖子' },
  'p1-8': { url: '/images/05_石神买便当.png', alt: '石神买便当' },

  // 第二章：命案之夜
  'p2-2': { url: '/images/07_富樫慎二_前夫.png', alt: '富樫慎二' },
  'p2-6': { url: '/images/08_餐厅对峙.png', alt: '餐厅对峙' },
  'p2-9': { url: '/images/45_傍晚的公寓走廊.png', alt: '傍晚的公寓走廊', caption: '门铃响起，不祥的预感成真' },
  'p2-12': { url: '/images/10_铜制花瓶.png', alt: '铜制花瓶' },
  'p2-16': { url: '/images/11_暖桌电线.png', alt: '暖桌电线' },
  'p2-19': { url: '/images/12_案发现场_模糊.png', alt: '案发现场' },

  // 第三章：石神的推断
  'p3-3': { url: '/images/45_傍晚的公寓走廊.png', alt: '石神深夜敲门', caption: '深夜，石神站在花冈家的走廊里' },
  'p3-5': { url: '/images/46_隔墙倾听.png', alt: '隔墙倾听', caption: '石神的小眼睛正朝屋里望去' },
  'p3-6': { url: '/images/47_蟑螂的借口.png', alt: '蟑螂的借口', caption: '"是蟑螂……有蟑螂……"' },
  'p3-9': { url: '/images/51_悬停的手指.png', alt: '悬停的手指', caption: '自首还是求助？手指悬在电话按键上' },
  'p3-10': { url: '/images/49_黑暗中的抉择.png', alt: '黑暗中的抉择', caption: '石神独自在黑暗中，做出决定' },
  'p3-11': { url: '/images/50_深夜电话.png', alt: '深夜电话', caption: '一墙之隔，两个紧张的人' },
  'p3-12': { url: '/images/52_逻辑的解答.png', alt: '逻辑的解答', caption: '石神看着暖桌下的尸体，给出了答案' },
  'p3-14': { url: '/images/48_直接追问.png', alt: '直接追问', caption: '"你问我怎么察觉出事了？"' },
  'p3-15': { url: '/images/58_推理细节_烟灰与电线.png', alt: '推理细节', caption: '烟灰、断电的暖桌线——石神推理的关键物证' },

  // 第四章：石神的计划
  'p4-4': { url: '/images/17_新大桥下的选择.png', alt: '新大桥下的选择', caption: '石神走向蓝色塑料布覆盖的游民聚落' },
  'p4-7': { url: '/images/18_石神带走流浪汉.png', alt: '石神带走流浪汉', caption: '石神以提供工作为由带走了骑绿色自行车的男人' },
  'p4-11': { url: '/images/19_不在场证明.png', alt: '不在场证明', caption: '电影票存根和拉面店收据——精心编造的时间线' },
  'p4-14': { url: '/images/20_夜色中的隅田川.png', alt: '夜色中的隅田川', caption: '真正的秘密，沉入了隅田川的暗流之中' },

  // 第五章：河边的尸体
  'p5-3': { url: '/images/21_河边的毁容尸体.png', alt: '河边的毁容尸体', caption: '旧江户川河岸——面目全非的尸体' },
  'p5-6': { url: '/images/22_富樫的驾驶证.png', alt: '富樫的驾驶证', caption: '死者身上的证件指向富樫慎二' },
  'p5-11': { url: '/images/23_草薙审问靖子.png', alt: '草薙审问靖子', caption: '草薙刑警在弁天亭询问花冈靖子' },
  'p5-12': { url: '/images/54_电影票根.png', alt: '电影票根', caption: '完美的不在场证明——电影票和拉面店收据' },
  'p5-14': { url: '/images/24_草薙的沉思.png', alt: '草薙的沉思', caption: '完美到不自然的不在场证明，令草薙心生疑窦' },

  // 第六章：汤川学的直觉
  'p6-1': { url: '/images/25_汤川学的实验室.png', alt: '汤川学的实验室', caption: '帝都大学物理系第十三研究室' },
  'p6-6': { url: '/images/26_汤川学_物理学家.png', alt: '汤川学', caption: '帝都大学物理学教授——汤川学' },
  'p6-9': { url: '/images/27_二十年的重逢.png', alt: '二十年的重逢', caption: '汤川学与石神，二十年后再会' },
  'p6-12': { url: '/images/28_黑板上的公式.png', alt: '黑板上的公式', caption: '高中教室里写满了前沿数学公式——这不是一个普通教师的水平' },

  // 第七章：汤川的推理
  'p7-1': { url: '/images/29_汤川走访游民聚落.png', alt: '汤川走访游民聚落', caption: '清晨，汤川独自来到新大桥下的游民聚落' },
  'p7-4': { url: '/images/30_消失的流浪汉.png', alt: '消失的流浪汉', caption: '骑绿色自行车的男人已经消失了十天' },
  'p7-11': { url: '/images/31_汤川的推理.png', alt: '汤川的推理', caption: '汤川站在新大桥上，推理出石神的全部计划' },
  'p7-13': { url: '/images/56_汤川的沉思.png', alt: '汤川的沉思', caption: '他的大学同窗，那个天才——居然用天才来犯罪' },
  'p7-14': { url: '/images/32_隅田川的黄昏.png', alt: '隅田川的黄昏', caption: '真相与河流一样深沉，看不见底' },

  // 第八章：石神的自首
  'p8-2': { url: '/images/33_汤川摊牌.png', alt: '汤川摊牌', caption: '"骑绿色自行车的男人——他才是河边那具尸体，对吗？"' },
  'p8-6': { url: '/images/34_石神的觉悟.png', alt: '石神的觉悟', caption: '石神做出了最后的决定——自首' },
  'p8-10': { url: '/images/35_最后一封信.png', alt: '最后一封信', caption: '"感谢你让我的人生有了意义。"' },
  'p8-12': { url: '/images/55_石神的房间内部.png', alt: '石神的房间内部', caption: '墙壁上贴满了数学公式，书堆成山——天才的牢笼' },
  'p8-13': { url: '/images/36_石神走进警局.png', alt: '石神走进警局', caption: '三月十七日上午九点，石神走进江东警察局' },

  // 第九章：献身
  'p9-3': { url: '/images/37_石神的审讯.png', alt: '石神的审讯', caption: '石神的口供天衣无缝——一份精心编造的谎言' },
  'p9-9': { url: '/images/57_汤川与靖子.png', alt: '汤川与靖子', caption: '弁天亭打烊后，汤川坐在靖子对面' },
  'p9-10': { url: '/images/38_真相的重量.png', alt: '真相的重量', caption: '汤川把一切告诉了靖子' },
  'p9-14': { url: '/images/39_靖子的决定.png', alt: '靖子的决定', caption: '靖子站了起来——"我要去见他。"' },
  'p9-15': { url: '/images/59_靖子走进警局.png', alt: '靖子走进警局', caption: '与石神走过同样的台阶——自首' },
  'p9-16': { url: '/images/60_拘留所的石神.png', alt: '拘留所的石神', caption: '所有的牺牲，在这一刻全部崩塌' },
  'p9-17': { url: '/images/40_献身.png', alt: '献身', caption: '"石神，你这道题，我永远也解不出来。"' },
};
