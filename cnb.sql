--
-- Database: `cnb`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--
DROP TABLE IF EXISTS `content`;
DROP TABLE IF EXISTS `visitor`;
DROP TABLE IF EXISTS `vote_content`;
DROP TABLE IF EXISTS `vote_widget`;
DROP TABLE IF EXISTS `widget`;
DROP TABLE IF EXISTS `widgetzone`;

CREATE TABLE IF NOT EXISTS `content` (
  `idContent` int(11) NOT NULL,
  `nomContent` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `idWidget` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE IF NOT EXISTS `visitor` (
  `idVisitor` varchar(255) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `vote_content`
--

CREATE TABLE IF NOT EXISTS `vote_content` (
  `idVisitor` int(11) NOT NULL,
  `idContent` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `vote_widget`
--

CREATE TABLE IF NOT EXISTS `vote_widget` (
  `idWidget` int(11) NOT NULL,
  `idVisitor` varchar(255) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `widget`
--

CREATE TABLE IF NOT EXISTS `widget` (
  `idWidget` int(11) NOT NULL,
  `nomWidget` varchar(255) NOT NULL,
  `idWidgetZone` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `widgetzone`
--

CREATE TABLE IF NOT EXISTS `widgetzone` (
  `idWidgetZone` int(11) NOT NULL,
  `nomWidgetZone` varchar(255) NOT NULL
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`idContent`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
  ADD PRIMARY KEY (`idVisitor`);

--
-- Indexes for table `vote_content`
--
ALTER TABLE `vote_content`
  ADD PRIMARY KEY (`idVisitor`,`idContent`);

--
-- Indexes for table `vote_widget`
--
ALTER TABLE `vote_widget`
  ADD PRIMARY KEY (`idWidget`,`idVisitor`);

--
-- Indexes for table `widget`
--
ALTER TABLE `widget`
  ADD PRIMARY KEY (`idWidget`);

--
-- Indexes for table `widgetzone`
--
ALTER TABLE `widgetzone`
  ADD PRIMARY KEY (`idWidgetZone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `idContent` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widget`
--
ALTER TABLE `widget`
  MODIFY `idWidget` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `widgetzone`
--
ALTER TABLE `widgetzone`
  MODIFY `idWidgetZone` int(11) NOT NULL AUTO_INCREMENT;
