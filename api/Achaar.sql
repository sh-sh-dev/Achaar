-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2018 at 03:44 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `achaar`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `n` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `ename` text COLLATE utf8mb4_persian_ci NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`n`, `name`, `ename`, `active`) VALUES
(1, 'هارد دیسک اکسترنال', 'External-Hard-Disk', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `n` int(11) NOT NULL,
  `user` text COLLATE utf8mb4_persian_ci NOT NULL,
  `product` int(11) NOT NULL,
  `title` text COLLATE utf8mb4_persian_ci NOT NULL,
  `text` text COLLATE utf8mb4_persian_ci NOT NULL,
  `score` int(11) NOT NULL,
  `date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `approved` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`n`, `user`, `product`, `title`, `text`, `score`, `date`, `approved`) VALUES
(1, '09357778351', 1, 'بررسي کامل و جامع اين هارد\n', 'با سلام خدمت دوستان\nمیخوام نظر و تجربه خودم رو در مورد این هارد باهاتون در میان بذارم؛ امیدوارم مؤثر و مفید واقع بشه.\nاین هارد دارای سنسور G-Shock هستش که کمتر هاردی به این سنسور مجهزه و وقتی امتحانش میکنید میبینید که واقعا کار میکنه؛ دوستان، ضد ضربه بودن یک هارد به معنای عدم آسیب پذیری در حین انتقال یا کپی کردن اطلاعات نیست! در واقع با وجود سنسور G-Shock، این هارد علاوه بر ضد ضربه بودن در حالت Unplugged (یعنی وقتی که به کامپیوتر وصل نیست)، از آسیب اطلاعات حین کپی کردن اونا توی هارد هم محافظت میکنه.\nمتأسفانه برخی دوستان در مورد مشکل چفت نشدن درب پورت USB و ضد آب بودن هارد پیش داوری میکنن؛ من خودم با گارانتی آونگ تماس گرفتم و اونا به من گفتن که اصلا یک محافظ Waterproof داخل خود این هارد تعبیه شده و قسمت داخلی به قسمت پورت USB وصل نیست؛ بعلاوه، همون اندازه ای که درب پورت USB چفت میشه برای ضد آب بودن کفایت میکنه و اینکه اگه شما هارد رو حتی بدون بستن درب پورت USB داخل آب بذارید، آب به داخل هارد نفوذ نمیکنه! ضمنا گفتن که حتی اگه یک درصد نفوذ کرد مشمول گارانتیه. من به خود سایت ADATA هم ایمیل زدم و این مسئله رو جویا شدم و اونا هم دقیقا همینو گفتن. ضمنا اگه یه جستجوی ساده توی اینترنت میبینید که خیلیا این مورد رو تست کردن و مشکلی پیش نیومده! یه نکته دیگه اینکه اگه با دقت به ضخامت لاستیک درپوش پورت USB نگاه کنید میبینید که ضخامت این درپوش از ضخامت لاستیک قسمتی که برای قرارگیری و چفت شدن درپوش تعبیه شده بیشتره! پس من فکر میکنم که ساخت درپوش هیچ مشکلی نداره و طبیعیه که نسبت به پورت USB برآمده تر باشه!\nدر مورد لق شدن سوکت USB باید بگم برای هارد من هنوز اتفاق نیفتاده؛ اما که با رعایت کردن 2 نکته بعید میدونم این مشکل برای هاردتون اتفاق بیفته؛ (1) وقتی میخواید کابل رو بهش وصل کنید، لطفا اول کابل رو به سوکت USB هارد وصل کنید و بعد اون رو به کامپیوتر وصل کنید و از اتصال سیم به پورت کامپیوتر در ابتدا خودداری کنید؛ (2) کابل هارد به گونه ای طراحی شده که پس از اتصال هارد به کامپیوتر (یا لپ تاپتون)، اگه هارد رو برعکس بذارید (یعنی رویه لانه زنبوری هارد به سمت زمین باشه) به سوکت USB هارد فشاری نمیاد و اتصال مطمئن تری داره؛ امتحان کنید!\nدر مورد تحمل فشار هم بگم که حتی توی سایت ADATA هم در این مورد اشاره ای نکرده؛ اما با توجه به اینکه این هارد استاندارد کیفیت نظامی MIL-STD-810G 516.6 رو داره و با توجه به ضد ضربه بودنش، باید در برابر فشار هم مقاوم باشه (این مورد رو برای این گفتم که مثلا هارد Silicon Power Armor A80 روی جعبش نوشته که تا 300 کیلوگرم فشار رو میتونه تحمل کنه).\nدر مورد کند شدن سرعت انتقال به مرور زمان واقعا چیزی نمیدونم؛ ولی خودمم زیاد اینو شنیدم.\nدر مورد سرعت انتقالش هم نمیتونم نظر بدم؛ چون لپ تاپ من پورت USB3 نداره.\nدر مورد قطع و وصل شدن هم باید بگم که در واقع کابل خیلی خوب توی پورت USB هارد چفت میشه، ولی از قسمت پورت کامپیوتر یه مقدار شُل میزنه که ممکنه با یه جابجایی کوچیک قطع و وصل بشه! البته با رعایت اون 2 نکته ای که توضیح دادم معمولا این مسئله کم اتفاق می افته.\nدر مورد امکان رمزگذاری روی هارد خدمتتون عرض کنم که این هارد قابلیت رمزگذاری نداره؛ شما وقتی توی سایت ADATA ثبت نام کنید می تونید نرم افزار HDD to GO رو دانلود کنید؛ اما باید بگم که انقدر این نرم افزار بی ارزشه که حتی ارزش دانلود کردن هم نداره؛ ضمنا توی این نرم افزار امکان رمزگذاری بر روی هارد وجود نداره و رمزگذاری که ازش توی نظرات یاد شده برای ورود به خود نرم افزاره، نه ورود به هارد! این نرم افزار برای پشتیبان گیری و همسان سازی اطلاعات بین هارد کامپیوتره که اصلا هم نرم افزار خوبی برای این کارها نیست. نرم افزار HDD Password Tool هم که توی نقد و بررسی تخصصی دیجی کالا بهش اشاره شده اصلا توی سایت ADATA وجود نداره! پس اگه واقعا حفاظت امنیتی از اطلاعات هاردتون براتون مهمه، این هارد برای شما مناسب نیست و هاردهای سری Passport شرکت Western Digital (اگه ضد آب و ضربه و... بودن براتون مهم نیست) یا هاردهای Silicon Power (اگه میخواید علاوه بر حفاظت امنیتی، امکان رمزگذاری با نرم افزار رو داشته باشه) براتون انتخاب بهتریه.\nدر پایان بگم که اگه قصد خرید هارد دارید، حتما هاردی تهیه کنید که در برابر همه چی مقاوم باشه؛ چون اتفاق یک لحظست و ارزششو داره با یه مقدار هزینه بیشتر، هارد مطمئنی تهیه کنید. به نظر من هارد ADATA HD720 ارزش خریدن رو داره؛ البته به شرطی که مشکلاتی رو که خدمتتون عرض کردم مراعات کنید.\nدوستان اگه این دیدگاه براتون مفید بود لایک کنید تا تبدیل به یک دیدگاه جامع در مورد این مدل هارد بشه.\nموفق و پیروز باشید.', 100, '1517914553', 1),
(2, '09363478412', 1, 'راه حل بسته شدن کامل درب پورت USB\n', 'سلام دوستان\nپیرو نظر قبلیم که توش این هارد رو به طور کامل جمع بندی کردم، تصمیم گرفتم به دنبال راهی برای بستن کامل درب پورت USB اون باشم. خوشبختانه باید بهتون این نوید رو بدم که درب پورت USB این هارد هم به طور کامل بسته میشه! بله دوستان، تعجب نکنید!\nخیلی از دوستان نظر دادن که برای بستن درب پورت USB باید انگشت شستمون رو روی نماد USB درب پورت بذاریم و اون رو به سمت جلو و داخل فشار بدیم؛ اما راستش با این کار باز هم قسمتی از درب پورت به صورت برآمده باقی میمونه و به طور کامل چفت نمیشه.\nبرای بستن کامل درب پورت USB، باید هارد رو طوری با هر دو دستتون بگیرید که انگشت های شست هر دو دستتون روی نماد USB درب پورت باشه و انگشت های اشاره هر دو دست روی پایین ترین قسمت پشت هارد قرار بگیره؛ بعد بایستی با یک فشار محکم و سریع، قسمتی که زیر انگشتای شستتون هست رو به سمت جلو و داخل فشار بدین (بازم تأکید میکنم، باید از هر دو دستتون استفاده کنید و بایستی فشاری که به درب پورت USB میارید خیلی سریع اتفاق بیفته)؛ خواهید دید که درب پورت USB چقدر قشنگ و کامل بسته میشه...\nدوستان لطفا چند بار امتحان کنید، اگه جواب داد لایک یادتون نره!\nبدرود...', 90, '1517915143', 1);

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `n` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `percent` int(11) NOT NULL,
  `special` int(11) NOT NULL DEFAULT '0',
  `expiry_date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`n`, `product`, `percent`, `special`, `expiry_date`, `active`) VALUES
(1, 1, 1, 0, '3000000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `loginattempts`
--

CREATE TABLE `loginattempts` (
  `n` int(11) NOT NULL,
  `ip` text COLLATE utf8mb4_persian_ci NOT NULL,
  `attempts` int(11) NOT NULL DEFAULT '1',
  `date` text COLLATE utf8mb4_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `n` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `price` bigint(20) NOT NULL,
  `category` int(11) NOT NULL,
  `available` int(11) NOT NULL DEFAULT '1',
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`n`, `name`, `price`, `category`, `available`, `active`) VALUES
(1, 'هارد اکسترنال اي ديتا مدل HD720 ظرفيت 1 ترابايت', 333000, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `n` int(11) NOT NULL,
  `token` text COLLATE utf8mb4_persian_ci NOT NULL,
  `user` text COLLATE utf8mb4_persian_ci NOT NULL,
  `date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `blocked` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `n` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `mobile` text COLLATE utf8mb4_persian_ci NOT NULL,
  `password` text COLLATE utf8mb4_persian_ci NOT NULL,
  `date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `blocked` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`n`, `name`, `mobile`, `password`, `date`, `blocked`) VALUES
(1, 'شایگان شکرالهی', '09357778351', '87d9bb400c0634691f0e3baaf1e2fd0d', '1517939154', 0),
(2, 'حسین خوانساری', '09363478412', '87d9bb400c0634691f0e3baaf1e2fd0d', '1518095698', 0);

-- --------------------------------------------------------

--
-- Table structure for table `warranties`
--

CREATE TABLE `warranties` (
  `n` int(11) NOT NULL,
  `product` text COLLATE utf8mb4_persian_ci NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `period` text COLLATE utf8mb4_persian_ci NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `warranties`
--

INSERT INTO `warranties` (`n`, `product`, `name`, `period`, `active`) VALUES
(1, '1', 'آونگ نماينده انحصاري ADATA به همراه سرويس پلاس (1 سال بازيابي رايگان اطلاعات)', '3 ساله', 1),
(2, '1', 'گارانتي اصالت و سلامت فيزيکي کالا', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `loginattempts`
--
ALTER TABLE `loginattempts`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `warranties`
--
ALTER TABLE `warranties`
  ADD PRIMARY KEY (`n`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `loginattempts`
--
ALTER TABLE `loginattempts`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `warranties`
--
ALTER TABLE `warranties`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
