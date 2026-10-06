// 添加作品时复制一条记录。type 可使用 game、video、document、gallery。
// 文件放入 assets/；url 可以是本地相对路径或 HTTPS 链接。
// 视频可用 kind: 'video' 播放 MP4/WebM；外部视频页使用 kind: 'link'。
window.PORTFOLIO_ITEMS = [
 { id: 'gluttony-art', type: 'gallery', title: '《暴食岛》像素素材图集', subtitle: '自制素材图集 · 角色表情、食物图标与动画', label: 'GALLERY / 自制素材', status: '16 张 · 含 7 张动画', cover: 'pixel-art', description: '《暴食岛》的自制素材图集，收录四组角色表情、五张食物图标和七张动画素材。保留原始像素与透明背景，GIF 动态播放，可点击放大查看。', images: [
   { name: '阿姆 Amu', group: '角色表情', src: 'assets/gallery/Amu.png' },
   { name: '菲利克斯 Felix', group: '角色表情', src: 'assets/gallery/Felix.png' },
   { name: '露露 Lulu', group: '角色表情', src: 'assets/gallery/Lulu.png' },
   { name: '克洛伊 Chloe', group: '角色表情', src: 'assets/gallery/Chloe.png' },
   { name: '炖萝卜', group: '食物图标', src: 'assets/gallery/Stewed_Radish.png' },
   { name: '混合果汁', group: '食物图标', src: 'assets/gallery/mixed_fruit_juice.png' },
   { name: '南瓜粥', group: '食物图标', src: 'assets/gallery/Pumpkin_porridge.png' },
   { name: '柠檬汁', group: '食物图标', src: 'assets/gallery/lemon_juice.png' },
   { name: '苹果汁', group: '食物图标', src: 'assets/gallery/apple_juice.png' },
   { name: '上贡箱', group: '动画素材', src: 'assets/gallery/tribute-chest.gif', previewWidth: 128, scale: 4 },
   { name: '黄色拉绳钟', group: '动画素材', src: 'assets/gallery/pull-cord-bell.gif', previewWidth: 192, scale: 4 },
   { name: '行走 Walk', group: '动画素材', src: 'assets/gallery/walk.gif', previewWidth: 288, scale: 4 },
   { name: '待机 Idle', group: '动画素材', src: 'assets/gallery/idle.gif', previewWidth: 288, scale: 4 },
   { name: '受伤 Hurt', group: '动画素材', src: 'assets/gallery/hurt.gif', previewWidth: 288, scale: 4 },
   { name: '深海下沉', group: '动画素材', src: 'assets/gallery/deep-sea-sinking.gif', scene: true },
   { name: '序章 1', group: '动画素材', src: 'assets/gallery/prologue-1.gif', scene: true }
 ] },
 { id: 'gluttony', type: 'game', title: '暴食岛', subtitle: '模拟经营 × 回合制 RPG × 肉鸽探索', label: 'GAME / 独立游戏', status: '体验 DEMO 可下载', cover: 'island', url: 'https://github.com/loke987/loke987.github.io/releases/download/demo-2026-10-01/OvereatingVillage.exe', trailer: 'assets/gluttony-trailer.mp4', description: '以美食、烹饪与生存抉择为核心的像素游戏。通过经营、上贡和地牢探索，建立互相影响的资源与成长循环。' },
 { id: 'gluttony-trailer', type: 'video', kind: 'video', title: '《暴食岛》游戏宣传片', subtitle: '《暴食岛》项目 · 游戏宣传视频', label: 'VIDEO / 宣传片', status: '在线播放', cover: 'assets/gluttony-trailer-poster.jpg', url: 'assets/gluttony-trailer.mp4', description: '《暴食岛》游戏宣传片。点击播放，观看游戏画面与玩法展示。' },
 { id: 'resume', type: 'document', title: '陈乐琦简历', subtitle: '个人履历 · 游戏策划与技术策划方向', label: 'RESUME / 个人简历', status: 'PDF · 可在线阅读', cover: 'resume', kind: 'pdf', url: 'assets/chen-leqi-resume.pdf', description: '陈乐琦的个人简历，整理教育经历、项目经历、技能方向与作品集入口。可在线阅读，也可下载 PDF。' },
 { id: 'gluttony-design', type: 'document', title: '《暴食岛》游戏策划案', subtitle: '在线阅读 · 玩法循环、系统规则与开发规划', label: 'DOCUMENT / 设计文档', status: 'PDF · 新版可在线阅读', cover: 'document', kind: 'pdf', url: 'assets/gluttony-design.pdf', description: '《暴食岛》的新版设计文档，包含核心循环、经营与战斗系统、角色设定和开发规划。无需另行下载，直接翻页阅读。文档中的部分内容仍处于规划阶段，以当前游戏版本为准。' }
];
