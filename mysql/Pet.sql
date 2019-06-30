{\rtf1\ansi\ansicpg936\cocoartf1671\cocoasubrtf200
{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset134 PingFangSC-Regular;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 -- phpMyAdmin SQL Dump\
-- version 4.6.5.2\
-- https://www.phpmyadmin.net/\
--\
-- Host: localhost:8889\
-- Generation Time: Jun 11, 2019 at 04:21 PM\
-- Server version: 5.6.35\
-- PHP Version: 7.1.1\
\
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\
SET time_zone = "+00:00";\
\
--\
-- Database: `PrtApp`\
--\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `Banner`\
--\
\
CREATE TABLE `Banner` (\
  `id` char(24) NOT NULL,\
  `url` varchar(100) NOT NULL,\
  `link` varchar(100) DEFAULT NULL,\
  `brief` varchar(100) DEFAULT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `Banner`\
--\
\
INSERT INTO `Banner` (`id`, `url`, `link`, `brief`) VALUES\
('1202-1528457643586-00001', 'http://111.231.141.185/pet/image/pet-banner-1.jpg', '', '
\f1 \'ca\'d7\'d2\'b3\'c2\'d6\'b2\'a5
\f0 '),\
('1202-1528457643586-00002', 'http://111.231.141.185/pet/image/pet-banner-2.jpg', '', '
\f1 \'ca\'d7\'d2\'b3\'c2\'d6\'b2\'a5
\f0 '),\
('1202-1528457643586-00003', 'http://111.231.141.185/pet/image/pet-banner-3.jpg', '', '
\f1 \'ca\'d7\'d2\'b3\'c2\'d6\'b2\'a5
\f0 '),\
('1202-1528457643586-00004', 'http://111.231.141.185/pet/image/pet-banner-4.jpg', '', '
\f1 \'ca\'d7\'d2\'b3\'c2\'d6\'b2\'a5
\f0 ');\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `Collect`\
--\
\
CREATE TABLE `Collect` (\
  `collect_id` char(24) NOT NULL,\
  `iphone` char(11) DEFAULT NULL,\
  `be_collect_id` char(24) DEFAULT NULL,\
  `type` int(11) DEFAULT '0',\
  `collect_time` datetime DEFAULT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `Collect`\
--\
\
INSERT INTO `Collect` (`collect_id`, `iphone`, `be_collect_id`, `type`, `collect_time`) VALUES\
('11d3-1556939772099-91476', '13381765960', '1202-1528457643586-10005', 0, '2019-05-04 11:16:12'),\
('1202-1528457643586-40000', '13381765960', '1202-1528457643586-10000', 0, '2019-04-21 03:52:49'),\
('171d-1559048112107-46132', '13381765960', '1202-1528457643586-20003', 1, '2019-05-28 08:55:12'),\
('197d-1559963421230-57469', '13381765960', '1202-1528457643586-30000', 2, '2019-06-08 11:10:21'),\
('22fd-1560133746119-00688', '13381765962', '1202-1528457643586-10005', 0, '2019-06-10 10:29:06'),\
('2893-1559048040120-04156', '13381765960', '1202-1528457643586-30001', 2, '2019-05-28 08:54:00'),\
('3090-1559047802859-60349', '13381765960', '1202-1528457643586-20000', 1, '2019-05-28 08:50:02'),\
('5fd7-1556934241524-54166', '13381765961', '1202-1528457643586-20003', 1, '2019-05-04 09:44:01'),\
('8089-1559351121670-78904', '13381765960', '1202-1528457643586-10002', 0, '2019-06-01 09:05:21'),\
('83ee-1556933927817-07594', '13381765961', '1202-1528457643586-20001', 1, '2019-05-04 09:38:47'),\
('89d3-1556957882745-11465', '13381765963', '1202-1528457643586-30002', 2, '2019-05-04 04:18:02'),\
('8fb6-1556934127866-40718', '13381765961', '1202-1528457643586-20000', 1, '2019-05-04 09:42:07');\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `Comments`\
--\
\
CREATE TABLE `Comments` (\
  `comment_id` char(24) NOT NULL,\
  `user_id` char(11) DEFAULT NULL,\
  `user_name` varchar(20) DEFAULT NULL,\
  `user_pic` varchar(100) DEFAULT NULL,\
  `be_commend_id` char(24) DEFAULT NULL,\
  `comment_time` datetime DEFAULT NULL,\
  `content` varchar(500) DEFAULT NULL,\
  `likes` int(11) DEFAULT '0'\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `Comments`\
--\
\
INSERT INTO `Comments` (`comment_id`, `user_id`, `user_name`, `user_pic`, `be_commend_id`, `comment_time`, `content`, `likes`) VALUES\
('19c1-1559351088616-90451', '13381765960', '
\f1 \'ca\'af\'ea\'bb
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', '1202-1528457643586-10002', '2019-06-01 09:04:48', '6666', 1),\
('3088-1556956098525-43007', '13381765963', '
\f1 \'ba\'dd\'c8\'cb\'b4\'f3\'b5\'db
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', '1202-1528457643586-10000', '2019-05-04 03:48:18', 'awdasdd', 0),\
('34b8-1560240671115-94914', '13381765960', '
\f1 \'ca\'af\'ea\'bb
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-4.jpg', '1202-1528457643586-10006', '2019-06-11 04:11:11', 'love ', 0),\
('3b3b-1556956083002-20147', '13381765963', '
\f1 \'ba\'dd\'c8\'cb\'b4\'f3\'b5\'db
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', '1202-1528457643586-10000', '2019-05-04 03:48:03', ' ', 6),\
('5427-1560213864057-08408', '13381765960', '
\f1 \'ca\'af\'ea\'bb
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-4.jpg', '1202-1528457643586-10003', '2019-06-11 08:44:24', '3333', 0),\
('5dc9-1558524863341-10974', '13381765963', '
\f1 \'ba\'dd\'c8\'cb\'b4\'f3\'b5\'db
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', '1202-1528457643586-30000', '2019-05-22 07:34:23', 'dashed  ', 0),\
('6a20-1560133750337-03497', '13381765962', '
\f1 \'b3\'fe\'b7\'e7
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-11.jpg', '1202-1528457643586-10005', '2019-06-10 10:29:10', '2222', 0),\
('7707-1556957873099-34027', '13381765963', '
\f1 \'ba\'dd\'c8\'cb\'b4\'f3\'b5\'db
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', '1202-1528457643586-30000', '2019-05-04 04:17:53', 'ddfggjkkk', 0),\
('7b10-1560211655087-05786', '13381765960', '
\f1 \'ca\'af\'ea\'bb
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-4.jpg', '1202-1528457643586-10003', '2019-06-11 08:07:35', '6666', 0),\
('8698-1557896910424-14232', '13381765960', '
\f1 \'ca\'af\'ea\'bb
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', '1202-1528457643586-10005', '2019-05-15 01:08:30', '6666', 0);\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `DataList`\
--\
\
CREATE TABLE `DataList` (\
  `id` char(24) NOT NULL,\
  `type` int(11) DEFAULT '0',\
  `dynamic_type` int(11) DEFAULT '0',\
  `iphone` char(11) DEFAULT NULL,\
  `title` varchar(50) DEFAULT NULL,\
  `brief` varchar(2000) DEFAULT NULL,\
  `image` varchar(2000) DEFAULT NULL,\
  `video` varchar(200) DEFAULT NULL,\
  `txt` varchar(200) DEFAULT NULL,\
  `publish_time` datetime DEFAULT NULL,\
  `reading` int(11) DEFAULT '0',\
  `likes` int(11) DEFAULT '0',\
  `collect` int(11) DEFAULT '0',\
  `comments` int(11) DEFAULT '0'\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `DataList`\
--\
\
INSERT INTO `DataList` (`id`, `type`, `dynamic_type`, `iphone`, `title`, `brief`, `image`, `video`, `txt`, `publish_time`, `reading`, `likes`, `collect`, `comments`) VALUES\
('1202-1528457643586-10000', 0, 1, '13381765960', NULL, '
\f1 \'bf\'c9\'c4\'dc\'d1\'f8\'b8\'f6\'b3\'e8\'ce\'ef\'a3\'ac\'b2\'c5\'c4\'dc\'b8\'f8\'d7\'d4\'bc\'ba\'b4\'f8\'c0\'b4\'bf\'ec\'c1\'cb\'b0\'c9\'a3\'a1\'a3\'a1
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg\uc0\u937 \u937 http://111.231.141.185/pet/image/pet-banner-1.jpg\u937 \u937 http://111.231.141.185/pet/image/pet-banner-7.jpg', '', NULL, '2019-04-21 02:52:58', 74, 2, 1, 2),\
('1202-1528457643586-10001', 0, 1, '13381765960', NULL, '
\f1 \'cf\'b2\'bb\'b6\'b8\'f6\'d6\'d6\'d0\'a1\'b6\'af\'ce\'ef\'a3\'ac\'bd\'d3\'cf\'c2\'c0\'b4\'c8\'c3\'ce\'d2\'c3\'c7\'d2\'bb\'c6\'f0\'cc\'bd\'cb\'f7\'b3\'e8\'ce\'ef\'b5\'c4\'b0\'c2\'c3\'d8\'b0\'c9
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-3.jpg', '', NULL, '2019-04-21 02:53:04', 4, 0, 0, 0),\
('1202-1528457643586-10002', 0, 1, '13381765960', NULL, '
\f1 \'bb\'b0\'cb\'b5\'a3\'ac\'ba\'dc\'b6\'e0\'b3\'e8\'ce\'ef\'c8\'b7\'ca\'b5\'ba\'dc\'bf\'c9\'b0\'ae\'a3\'ac\'b5\'ab\'d2\'aa\'cb\'b5\'b5\'c4\'ca\'c7\'a3\'ac\'b2\'bb\'ca\'c7\'c3\'bf\'d2\'bb\'d6\'bb\'b3\'e8\'ce\'ef\'b5\'c4\'d1\'d5\'d6\'b5\'a3\'ac\'b6\'bc\'c4\'dc\'be\'ad\'ca\'dc\'c6\'f0\'cb\'af\'be\'f5\'d5\'e2\'d2\'bb\'cf\'ee\'bf\'bc\'d1\'e9\'a3\'ac\'b2\'bb\'d0\'c5\'c0\'b4\'bf\'b4
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-9.jpg', 'http://111.231.141.185/pet/videos/birdie.mp4', NULL, '2019-04-21 02:50:43', 35, 1, 1, 1),\
('1202-1528457643586-10003', 0, 1, '13381765962', NULL, '
\f1 \'cf\'e0\'d0\'c5\'d0\'a1\'cd\'c3\'d7\'d3\'b4\'f3\'bc\'d2\'d2\'b2\'b6\'bc\'b2\'bb\'c4\'b0\'c9\'fa\'a1\'a3\'c4\'c7\'d0\'a9\'ba\'a6\'c5\'c2\'b2\'d6\'ca\'f3\'b5\'c4\'c5\'f3\'d3\'d1\'c3\'c7\'be\'cd\'bf\'c9\'d2\'d4\'c0\'b4\'cb\'c7\'d1\'f8\'d2\'bb\'d6\'bb\'d0\'a1\'cd\'c3\'d7\'d3\'a1\'a3\'d0\'a1\'cd\'c3\'d7\'d3\'b5\'c4\'cd\'e2\'b1\'ed\'d2\'b2\'b7\'c7\'b3\'a3\'bf\'c9\'b0\'ae\'a3\'ac\'c8\'ed\'c3\'c8\'c8\'ed\'c3\'c8\'b5\'c4\'a1\'a3\'c8\'e7\'b9\'fb\'d1\'f8\'d2\'bb\'d6\'bb\'cd\'c3\'d7\'d3\'b4\'f8\'b3\'f6\'c8\'a5\'b9\'e4\'bd\'d6\'a3\'ac\'cf\'e0\'d0\'c5\'b4\'f3\'bc\'d2\'b6\'d4\'c4\'e3\'c3\'c7\'b5\'c4\'bb\'d8\'cd\'b7\'c2\'ca\'b6\'bc\'bb\'e1\'b7\'c7\'b3\'a3\'b5\'c4\'b8\'df\'a1\'a3\'d0\'a1\'cd\'c3\'d7\'d3\'b5\'c4\'cb\'c7\'d1\'f8\'b7\'bd\'b7\'a8\'d2\'b2\'b7\'c7\'b3\'a3\'b5\'c4\'bc\'f2\'b5\'a5\'a3\'ac\'bf\'c9\'d2\'d4\'b9\'ba\'c2\'f2\'d2\'bb\'d0\'a9\'cd\'c3\'cb\'c7\'c1\'cf\'ba\'cd\'b8\'c9\'b2\'dd\'a3\'ac\'b5\'ab\'ca\'c7\'d2\'bb\'b6\'a8\'d2\'aa\'d7\'a2\'d2\'e2\'b8\'f8\'cd\'c3\'d7\'d3\'b6\'a8\'c6\'da\'b4\'f2\'c9\'a8\'ce\'c0\'c9\'fa\'a3\'ac\'b0\'d1\'cd\'c3\'d7\'d3\'b7\'c5\'d4\'da\'cd\'a8\'b7\'e7\'b5\'c4\'b5\'d8\'b7\'bd\'a1\'a3\'d0\'a1\'cd\'c3\'d7\'d3\'c8\'e7\'b9\'fb\'d3\'d0\'c0\'ad\'cf\'a1\'b5\'c8\'d7\'b4\'bf\'f6\'a3\'ac\'d2\'bb\'b6\'a8\'d2\'aa\'bc\'b0\'ca\'b1\'b8\'f8\'cb\'fb\'b3\'d4\'d2\'a9\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-7.jpg', 'http://111.231.141.185/pet/videos/birdie.mp4', NULL, '2019-04-21 02:50:52', 187, 17, 0, 2),\
('1202-1528457643586-10004', 0, 1, '13381765960', NULL, '
\f1 \'b2\'d6\'ca\'f3\'cf\'e0\'d0\'c5\'b4\'f3\'bc\'d2\'b6\'bc\'d6\'aa\'b5\'c0\'a3\'ac\'d2\'b2\'b6\'bc\'cc\'fd\'cb\'b5\'b9\'fd\'a3\'ac\'ca\'c7\'b7\'c7\'b3\'a3\'bf\'c9\'b0\'ae\'b5\'c4\'d2\'bb\'d6\'d6\'d0\'a1\'c9\'fa\'ce\'ef\'a3\'ac\'cb\'fc\'be\'cd\'cf\'f1\'ca\'c7\'d2\'bb\'b8\'f6\'cc\'c0\'d4\'b2\'d2\'bb\'d1\'f9\'a1\'a3\'b2\'d6\'ca\'f3\'d1\'f8\'d6\'b3\'d2\'b2\'b7\'c7\'b3\'a3\'b5\'c4\'bc\'f2\'b5\'a5\'a3\'ac\'d7\'bc\'b1\'b8\'b8\'f6\'cd\'a8\'b7\'e7\'cd\'b8\'c6\'f8\'b5\'c4\'c1\'fd\'d7\'d3\'a3\'ac\'b7\'c5\'b5\'bd\'b1\'dc\'b9\'e2\'b5\'c4\'b5\'d8\'b7\'bd\'a1\'a3\'d4\'da\'c1\'fd\'d7\'d3\'b5\'c4\'b5\'d7\'b2\'bf\'c6\'cc\'d2\'bb\'d0\'a9\'c4\'be\'d0\'bc\'a3\'ac\'c8\'bb\'ba\'f3\'d4\'da\'c4\'b3\'b1\'a6\'c9\'cf\'b9\'ba\'c2\'f2\'d7\'a8\'d2\'b5\'b5\'c4\'b2\'d6\'ca\'f3\'c1\'b8\'a3\'ac\'b8\'f8\'b2\'d6\'ca\'f3\'ba\'c8\'b5\'c4\'cb\'ae\'d2\'bb\'b6\'a8\'d2\'aa\'ca\'c7\'bf\'f3\'c8\'aa\'cb\'ae\'bb\'f2\'d5\'df\'ca\'c7\'c1\'b9\'b0\'d7\'bf\'aa\'a3\'ac\'b2\'bb\'c4\'dc\'ba\'c8\'d7\'d4\'c0\'b4\'cb\'ae\'a3\'ac\'ba\'c8\'d7\'d4\'c0\'b4\'cb\'ae\'bb\'e1\'b5\'bc\'d6\'c2\'b2\'d6\'ca\'f3\'b8\'b9\'d0\'ba\'a1\'a3
\f0 ', '', '', NULL, '2019-05-02 02:36:50', 42, 1, 0, 0),\
('1202-1528457643586-10005', 0, 1, '13381765960', NULL, '
\f1 \'cf\'d6\'d4\'da\'d1\'f8\'b3\'e8\'ce\'ef\'b5\'c4\'c8\'cb\'d5\'e6\'b5\'c4\'ca\'c7\'d4\'bd\'c0\'b4\'d4\'bd\'b6\'e0\'a3\'ac\'b3\'e8\'ce\'ef\'b5\'c4\'d6\'d6\'c0\'e0\'d2\'b2\'d4\'bd\'c0\'b4\'d4\'bd\'b6\'e0\'d1\'f9\'bb\'af\'a1\'a3\'ba\'dc\'b6\'e0\'c8\'cb\'b6\'bc\'bb\'e1\'d1\'f8\'d2\'bb\'d6\'bb\'c3\'a8\'bb\'f2\'b9\'b7\'a3\'ac\'bf\'c9\'ca\'c7\'b6\'d4\'d3\'da\'d5\'fd\'d4\'da\'c9\'cf\'d1\'a7\'b5\'c4\'d0\'a1\'bb\'ef\'b0\'e9\'c4\'d8\'a3\'ac\'ca\'c7\'c3\'bb\'d3\'d0\'b0\'ec\'b7\'a8\'d1\'f8\'d6\'bb\'c3\'a8\'ba\'cd\'b9\'b7\'b5\'c4\'a3\'ac\'b6\'f8\'c7\'d2\'c3\'a8\'ba\'cd\'b9\'b7\'b5\'c4\'bf\'aa\'cf\'fa\'b6\'bc\'b1\'c8\'bd\'cf\'b4\'f3\'a3\'ac\'d5\'fd\'d4\'da\'c9\'cf\'d1\'a7\'b5\'c4\'d0\'a1\'bb\'ef\'b0\'e9\'a3\'ac\'d2\'bb\'b0\'e3\'b5\'c4\'be\'ad\'bc\'c3\'cc\'f5\'bc\'fe\'b6\'bc\'b2\'bb\'ca\'c7\'cc\'d8\'b1\'f0\'b5\'c4\'ba\'c3\'a1\'a3\'b5\'ab\'ca\'c7\'d4\'da\'d1\'a7\'d0\'a3\'c0\'ef\'b5\'c4\'c8\'d5\'d7\'d3\'d3\'d6\'be\'f5\'b5\'c3\'b9\'fd\'d3\'da\'ce\'de\'c1\'c4\'a3\'ac\'be\'cd\'cf\'eb\'d2\'aa\'d2\'bb\'d6\'bb\'b3\'e8\'ce\'ef\'a3\'ac\'c0\'b4\'c5\'e3\'b0\'e9\'d7\'d4\'bc\'ba\'a3\'ac\'c8\'b4\'b2\'bb\'d6\'aa\'b5\'c0\'d1\'f8\'ca\'b2\'c3\'b4\'ba\'c3\'a1\'a3\'c4\'c7\'c3\'b4\'bd\'d3\'cf\'c2\'c0\'b4\'d0\'a1\'b1\'e0\'be\'cd\'c0\'b4\'b8\'f8\'b4\'f3\'bc\'d2\'bd\'e9\'c9\'dc\'bc\'b8\'d6\'d6\'a3\'ac\'ca\'ca\'ba\'cf\'d4\'da\'d1\'a7\'d0\'a3\'cb\'c7\'d1\'f8\'b5\'c4\'d0\'a1\'b6\'af\'ce\'ef\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg\uc0\u937 \u937 http://111.231.141.185/pet/image/pet-banner-1.jpg\u937 \u937 http://111.231.141.185/pet/image/pet-banner-7.jpg\u937 \u937 http://111.231.141.185/pet/image/pet-banner-1.jpg\u937 \u937 http://111.231.141.185/pet/image/pet-banner-7.jpg', '', NULL, '2019-05-03 11:30:05', 82, 1, 2, 2),\
('1202-1528457643586-10006', 0, 2, '13381765962', NULL, '
\f1 \'cf\'b2\'bb\'b6\'d5\'e2\'d0\'a9\'ce\'de\'b5\'d0\'bf\'c9\'b0\'ae\'b5\'c4\'d0\'a1\'c4\'f1
\f0 ,
\f1 \'c3\'c8\'c3\'c8\'df\'d5
\f0 ,
\f1 \'ce\'d2\'d2\'b2\'d2\'aa\'d1\'f8\'d2\'bb\'d6\'bb\'a1\'a3
\f0 ', '', 'http://111.231.141.185/pet/videos/birdie.mp4', NULL, '2019-06-11 04:10:43', 3, 1, 0, 1),\
('1202-1528457643586-20000', 1, 0, '13381765960', '
\f1 \'d1\'f8\'d2\'bb\'d6\'bb\'c0\'b6\'c3\'a8\'b0\'c9\'c3\'bb\'ca\'c2\'b4\'f2\'bc\'dc
\f0 ', '
\f1 \'bb\'a8\'d6\'a6\'ca\'f3\'ca\'c7\'cf\'d6\'d4\'da\'d0\'c2\'d0\'cb\'b5\'c4\'d2\'bb\'d6\'d6\'b6\'af\'ce\'ef\'a1\'a3\'bb\'a8\'d6\'a6\'ca\'f3\'b7\'c7\'b3\'a3\'b5\'c4\'c7\'d7\'c8\'cb\'a3\'ac\'cb\'fc\'bb\'e1\'cf\'f1\'b9\'b7\'b9\'b7\'d2\'bb\'d1\'f9\'c0\'b4\'cc\'f2\'c4\'e3\'b5\'c4\'ca\'d6\'a3\'ac\'d2\'f2\'ce\'aa\'c4\'c7\'ca\'c7\'bb\'a8\'d6\'a6\'ca\'f3\'cf\'b2\'bb\'b6\'c4\'e3\'b5\'c4\'b1\'ed\'cf\'d6\'a1\'a3\'bb\'a8\'d6\'a6\'ca\'f3\'b5\'c4\'d1\'f8\'d6\'b3\'d2\'b2\'b7\'c7\'b3\'a3\'b5\'c4\'bc\'f2\'b5\'a5\'a3\'ac\'bc\'b8\'ba\'f5\'ca\'c7\'ba\'cd\'b2\'d6\'ca\'f3\'b2\'ee\'b2\'bb\'b6\'e0\'b5\'c4\'a3\'ac\'b5\'ab\'ca\'c7\'bb\'a8\'d6\'a6\'ca\'f3\'b2\'bb\'c4\'dc\'b3\'d4\'ba\'ac\'d1\'ce\'c1\'bf\'b8\'df\'b5\'c4\'ca\'b3\'ce\'ef\'a3\'ac\'d2\'b2\'b2\'bb\'c4\'dc\'b3\'d4\'ba\'ac\'cc\'c7\'b7\'d6\'b8\'df\'b5\'c4\'ca\'b3\'ce\'ef\'a3\'ac\'d5\'e2\'d1\'f9\'bb\'e1\'b6\'d4\'cb\'fb\'b5\'c4\'c9\'f6\'d3\'d0\'cb\'f0\'ba\'a6\'a1\'a3\'d2\'aa\'b8\'f8\'bb\'a8\'d6\'a6\'ca\'f3\'d7\'bc\'b1\'b8\'d2\'bb\'b8\'f6\'b4\'f3\'d2\'bb\'d0\'a9\'b5\'c4\'c1\'fd\'d7\'d3\'a3\'ac\'b2\'bb\'bf\'c9\'d2\'d4\'d3\'c3\'b2\'d6\'ca\'f3\'b5\'c4\'c1\'fd\'d7\'d3\'a3\'ac\'b2\'bb\'c4\'dc\'d4\'da\'c1\'fd\'d7\'d3\'b5\'d7\'b2\'bf\'c6\'cc\'c4\'be\'d0\'bc\'a3\'ac\'d2\'f2\'ce\'aa\'bb\'a8\'d6\'a6\'ca\'f3\'b5\'c4\'ba\'f4\'ce\'fc\'b5\'c0\'b1\'c8\'bd\'cf\'b4\'e0\'c8\'f5\'a3\'ac\'c4\'be\'d0\'bc\'b5\'c4\'b7\'db\'b3\'be\'c8\'dd\'d2\'d7\'d4\'ec\'b3\'c9\'cb\'fc\'b5\'c4\'ba\'f4\'ce\'fc\'b5\'c0\'b8\'d0\'c8\'be\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-1.jpg', NULL, 'http://111.231.141.185/pet/txt/test.docx', '2019-04-21 02:40:41', 22, 2, 2, 0),\
('1202-1528457643586-20001', 1, 0, '13381765961', '
\f1 \'b0\'ae\'b3\'e8\'b4\'f3\'bb\'fa\'c3\'dc
\f0 ', '
\f1 \'d4\'da\'b5\'c2\'b9\'fa\'a3\'ac\'c3\'bf\'c8\'fd\'b8\'f6\'bc\'d2\'cd\'a5\'d6\'d0\'be\'cd\'d3\'d0\'d2\'bb\'bc\'d2\'cb\'c7\'d1\'f8\'d7\'c5\'b3\'e8\'ce\'ef\'a3\'ac\'d2\'f2\'b4\'cb\'b3\'e8\'ce\'ef\'d2\'b5\'d2\'b2\'b3\'c9\'c1\'cb\'b5\'c2\'b9\'fa\'b5\'c4\'d2\'bb\'cf\'ee\'d7\'a8\'c3\'c5\'b2\'fa\'d2\'b5\'a3\'ac\'b8\'ba\'d4\'f0\'ce\'aa\'b3\'e8\'ce\'ef\'c9\'fa\'b2\'fa\'cb\'c7\'c1\'cf\'ba\'cd\'b1\'d8\'d0\'e8\'c6\'b7\'a1\'a3\'c8\'bb\'b6\'f8\'a3\'ac\'b3\'e8\'ce\'ef\'d4\'f2\'b2\'bb\'cd\'ac\'a3\'ac\'c8\'cb\'c3\'c7\'cb\'c7\'d1\'f8\'b3\'e8\'ce\'ef\'ca\'c7\'d2\'f2\'ce\'aa\'cb\'fc\'c3\'c7\'ca\'ae\'b7\'d6\'bf\'c9\'b0\'ae\'a3\'ac\'c4\'dc\'b9\'bb\'b8\'f8\'ce\'d2\'c3\'c7\'b4\'f8\'c0\'b4\'bf\'ec\'c0\'d6\'a1\'a3\'c0\'fd\'c8\'e7\'a3\'ac\'cb\'ae\'d7\'e5\'cf\'e4\'c0\'ef\'c9\'ab\'b2\'ca\'d1\'a4\'c0\'f6\'b5\'c4\'bf\'d7\'c8\'b8\'d3\'e3\'a3\'ac\'c4\'f1\'c1\'fd\'d6\'d0\'c3\'c0\'c0\'f6\'b5\'c4\'bb\'a2\'c6\'a4\'f0\'d0\'f0\'c4\'a3\'ac\'cb\'c7\'d1\'f8\'cf\'e4\'d6\'d0\'b9\'c5\'b9\'d6\'b5\'c4\'b2\'ca\'c9\'ab\'f2\'e1\'f2\'e6\'a3\'ac\'bb\'f2\'d5\'df\'ca\'c7\'bf\'c9\'b0\'ae\'b5\'c4\'d0\'a1\'b0\'d7\'ca\'f3\'a1\'a3\'b5\'ab\'ca\'c7\'a3\'ac\'ce\'d2\'c3\'c7\'d7\'ee\'cf\'b2\'b0\'ae\'c7\'d2\'d7\'ee\'b3\'a3\'cb\'c7\'d1\'f8\'b5\'c4\'b3\'e8\'ce\'ef\'d4\'f2\'ca\'c7\'c3\'a8\'ba\'cd\'b9\'b7\'a1\'a3\'d0\'ed\'b6\'e0\'bc\'d2\'d0\'f3\'ba\'cd\'b3\'e8\'ce\'ef\'b6\'bc\'ca\'c7\'d3\'c9\'c8\'cb\'c0\'e0\'cb\'c7\'d1\'f8\'b3\'a4\'b4\'f3\'b5\'c4\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-2.jpg', NULL, 'http://111.231.141.185/pet/txt/test.docx', '2019-04-21 02:42:05', 6, 1, 1, 0),\
('1202-1528457643586-20002', 1, 0, '13381765962', '
\f1 \'d4\'f5\'c3\'b4\'cb\'c7\'d1\'f8\'b3\'e8\'ce\'ef
\f0 ', '
\f1 \'bd\'f0\'d3\'e3\'cb\'c7\'d1\'f8\'b5\'c4\'b9\'fd\'b3\'cc\'d6\'d0\'a3\'ac\'d3\'d0\'c8\'fd\'d6\'d6\'bb\'bb\'cb\'ae\'b5\'c4\'c7\'e9\'bf\'f6\'a1\'a3\'d2\'bb\'b0\'e3\'bb\'bb\'cb\'ae\'a3\'ac\'b2\'bf\'b7\'d6\'bb\'bb\'cb\'ae\'ba\'cd\'b3\'b9\'b5\'d7\'bb\'bb\'cb\'ae\'a1\'a3\'d2\'bb\'b0\'e3\'bb\'bb\'cb\'ae\'b7\'bd\'b7\'a8\'b2\'bb\'d2\'d7\'c9\'cb\'bc\'b0\'d3\'e3\'cc\'e5\'a3\'ac\'b7\'bd\'b7\'a8\'bc\'f2\'b1\'e3\'b6\'f8\'b0\'b2\'c8\'ab\'a3\'ac\'d7\'ee\'ca\'ca\'d3\'c3\'d3\'da\'bc\'d2\'cd\'a5\'d3\'e3\'b8\'d7\'bb\'f2\'d0\'a1\'b3\'d8\'d1\'f8\'d3\'e3\'d5\'df\'d3\'a6\'d3\'c3\'a1\'a3\'cb\'f9\'d2\'d4\'b4\'f3\'bc\'d2\'d3\'a6\'b8\'c3\'d6\'f7\'d2\'aa\'d5\'c6\'ce\'d5\'b5\'da\'d2\'bb\'d6\'d6\'b7\'bd\'b7\'a8\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-3.jpg', NULL, 'http://111.231.141.185/pet/txt/test.docx', '2019-04-21 02:37:41', 0, 0, 0, 0),\
('1202-1528457643586-20003', 1, 0, '13381765963', '
\f1 \'b3\'e8\'ce\'ef\'c9\'ed\'c9\'cf\'b5\'c4\'bc\'c4\'c9\'fa\'b3\'e6
\f0 ', '
\f1 \'cc\'f8\'d4\'e9\'ca\'c7\'c3\'a8\'df\'e4\'c9\'ed\'c9\'cf\'b3\'a3\'bc\'fb\'b5\'c4\'d2\'bb\'d6\'d6\'bc\'c4\'c9\'fa\'b3\'e6\'a3\'ac\'cb\'fc\'d6\'f7\'d2\'aa\'bc\'c4\'c9\'fa\'d4\'da\'c3\'a8\'df\'e4\'b5\'c4\'c3\'ab\'b7\'a2\'d6\'d0\'a3\'ac\'b2\'a2\'c7\'d2\'d3\'d0\'bc\'ab\'c7\'bf\'b5\'c4\'b7\'b1\'d6\'b3\'c4\'dc\'c1\'a6\'a1\'a3\'b5\'b1\'b3\'e8\'ce\'ef\'c3\'a8\'df\'e4\'b3\'a4\'ca\'b1\'bc\'e4\'c3\'bb\'d3\'d0\'c7\'e5\'bd\'e0\'b9\'fd\'ca\'b1\'a3\'ac\'c3\'a8\'df\'e4\'b5\'c4\'c3\'ab\'b7\'a2\'be\'cd\'b3\'c9\'c1\'cb\'cc\'f8\'d4\'e9\'b5\'c4\'ce\'c2\'b4\'b2\'a3\'ac\'cc\'f8\'d4\'e9\'bb\'e1\'bd\'e8\'d3\'c3\'d5\'e2\'b8\'f6\'ce\'c2\'b4\'b2\'bd\'f8\'d0\'d0\'b4\'f3\'c1\'bf\'b5\'c4\'b7\'b1\'d6\'b3\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-4.jpg', NULL, 'http://111.231.141.185/pet/txt/test.docx', '2019-04-21 02:42:48', 8, 3, 2, 0),\
('1202-1528457643586-30000', 2, 0, '13381765960', '
\f1 \'b2\'bc\'c5\'bc\'d4\'f5\'c3\'b4\'d1\'f9
\f0 ', '
\f1 \'c8\'cb\'c9\'fa\'e1\'db\'b7\'e5\'b0\'a1
\f0 ,
\f1 \'d7\'e4\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', 'http://111.231.141.185/pet/videos/birdie.mp4', NULL, '2019-04-21 02:44:27', 54, 3, 1, 3),\
('1202-1528457643586-30001', 2, 0, '13381765961', '
\f1 \'b3\'e8\'ce\'ef\'b5\'c4\'ca\'d9\'c3\'fc
\f0 ', '
\f1 \'d4\'da\'c8\'d1\'c9\'ef\'c6\'da\'c4\'b8\'c8\'ae\'b5\'c4\'cb\'c7\'d1\'f8\'d3\'a6\'b8\'c3\'b9\'a9\'d3\'a6\'b3\'e4\'b7\'d6\'b5\'c4\'d3\'c5\'d6\'ca\'cb\'c7\'c1\'cf\'a3\'ac\'d2\'d4\'b1\'e3\'d4\'f6\'c7\'bf\'c4\'b8\'c8\'ae\'b5\'c4\'cc\'e5\'d6\'ca\'a3\'ac\'b1\'a3\'d6\'a4\'cc\'a5\'b6\'f9\'bd\'a1\'c8\'ab\'b7\'a2\'d3\'fd\'d2\'d4\'bc\'b0\'b7\'c0\'d6\'b9\'c1\'f7\'b2\'fa\'a1\'a3\'c8\'d1\'c9\'ef\'cd\'b7\'d2\'bb\'b8\'f6\'d4\'c2\'a3\'ac\'cc\'a5\'b6\'f9\'b1\'c8\'bd\'cf\'d0\'a1\'a3\'ac\'b2\'bb\'b1\'d8\'ce\'aa\'c4\'b8\'c8\'ae\'d7\'bc\'b1\'b8\'cc\'d8\'b1\'f0\'b5\'c4\'cb\'c7\'c1\'cf\'a3\'ac\'b5\'ab\'ca\'c7\'d2\'aa\'d7\'a2\'d2\'e2\'d7\'bc\'ca\'b1\'ce\'b9\'ca\'b3\'a3\'ac\'b2\'bb\'bf\'c9\'d2\'d4\'d4\'e7\'d2\'bb\'b6\'d9\'a3\'ac\'cd\'ed\'d2\'bb\'b6\'d9
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', 'http://111.231.141.185/pet/videos/birdie.mp4', NULL, '2019-04-21 02:44:39', 16, 2, 1, 0),\
('1202-1528457643586-30002', 2, 0, '13381765962', '
\f1 \'d7\'ee\'d5\'b3\'c8\'cb\'b5\'c4\'b3\'e8\'ce\'ef
\f0 ', '
\f1 \'b2\'e9\'c0\'ed\'ca\'bf\'cd\'f5\'d0\'a1\'c1\'d4\'c8\'ae\'d4\'da\'b8\'d0\'b5\'bd\'ba\'ae\'c0\'e4\'b5\'c4\'ca\'b1\'ba\'f2\'bb\'e1\'b7\'a2\'b6\'b6\'a3\'ac\'d2\'bb\'d0\'a9\'c8\'ae\'d4\'da\'cf\'b4\'d4\'e8\'ba\'f3\'c3\'ab\'ce\'b4\'b2\'c1\'b8\'c9\'d2\'b2\'bb\'e1\'b7\'a2\'b6\'b6\'a3\'ac\'d5\'e2\'ca\'c7\'d5\'fd\'b3\'a3\'cf\'d6\'cf\'f3\'a1\'a3\'bf\'c9\'ca\'c7\'a3\'ac\'c8\'e7\'b9\'fb\'c8\'ae\'d4\'da\'b2\'a2\'b2\'bb\'c0\'e4\'b5\'c4\'ca\'b1\'ba\'f2\'b7\'a2\'b6\'b6\'b2\'bb\'cd\'a3\'a3\'ac\'be\'cd\'d2\'aa\'d2\'fd\'c6\'f0\'d6\'f7\'c8\'cb\'b5\'c4\'d7\'a2\'d2\'e2\'c1\'cb\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', 'http://111.231.141.185/pet/videos/birdie.mp4', NULL, '2019-04-21 02:44:44', 10, 1, 1, 0),\
('1202-1528457643586-30003', 2, 0, '13381765962', '
\f1 \'bd\'f0\'d3\'e3\'bb\'bb\'cb\'ae\'b7\'a8
\f0 ', '
\f1 \'bb\'a4\'d6\'f7\'d1\'b5\'c1\'b7\'ca\'c7\'d4\'da\'c8\'ae\'be\'df\'b1\'b8\'c6\'cb\'d2\'a7\'c4\'dc\'c1\'a6\'bb\'f9\'b4\'a1\'c9\'cf\'bd\'f8\'d0\'d0\'b5\'c4\'a3\'ac\'ca\'c7\'d6\'b8\'d6\'f7\'c8\'cb\'b5\'c4\'b0\'b2\'c8\'ab\'d4\'da\'ca\'dc\'b5\'bd\'cd\'fe\'d0\'b2\'ca\'b1\'a3\'ac\'c8\'ae\'c4\'dc\'d6\'f7\'b6\'af\'b0\'ef\'d6\'fa\'d6\'f7\'c8\'cb\'b9\'a5\'bb\'f7\'b6\'d4\'b7\'bd\'a1\'a3
\f0 ', 'http://111.231.141.185/pet/image/pet-banner-5.jpg', 'http://111.231.141.185/pet/videos/birdie.mp4', NULL, '2019-04-21 02:47:15', 15, 1, 0, 0);\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `Likes`\
--\
\
CREATE TABLE `Likes` (\
  `likes_id` char(24) NOT NULL,\
  `iphone` char(11) DEFAULT NULL,\
  `be_Like_id` char(24) DEFAULT NULL,\
  `type` int(11) DEFAULT '0',\
  `likes_time` datetime DEFAULT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `Likes`\
--\
\
INSERT INTO `Likes` (`likes_id`, `iphone`, `be_Like_id`, `type`, `likes_time`) VALUES\
('10c3-1560067286928-61373', '13381765962', '1202-1528457643586-30000', 2, '2019-06-09 04:01:26'),\
('1202-1528457643586-50000', '13381765960', '1202-1528457643586-10000', 0, '2019-04-21 04:07:04'),\
('2330-1560133740210-74246', '13381765962', '1202-1528457643586-10003', 0, '2019-06-10 10:29:00'),\
('3410-1556872984798-18915', '13381765961', '1202-1528457643586-20003', 1, '2019-05-03 04:43:04'),\
('356f-1559351929881-23369', '13381765960', '1202-1528457643586-10002', 0, '2019-06-01 09:18:49'),\
('3a0c-1559963444235-79450', '13381765960', '1202-1528457643586-30003', 2, '2019-06-08 11:10:44'),\
('403a-1557896837103-53907', '13381765963', '1202-1528457643586-30000', 2, '2019-05-15 01:07:17'),\
('445f-1556957987599-70618', '13381765963', '1202-1528457643586-30001', 2, '2019-05-04 04:19:47'),\
('4c46-1559047998675-90018', '13381765960', '1202-1528457643586-20000', 1, '2019-05-28 08:53:18'),\
('533e-1560240665096-73153', '13381765960', '1202-1528457643586-10006', 0, '2019-06-11 04:11:05'),\
('5b66-1559048022081-77221', '13381765960', '1202-1528457643586-10005', 0, '2019-05-28 08:53:42'),\
('5d83-1558878546557-67353', '13381765960', '1202-1528457643586-10004', 0, '2019-05-26 09:49:06'),\
('5e19-1559465788979-66446', '13381765960', '1202-1528457643586-30000', 2, '2019-06-02 04:56:29'),\
('6285-1559048114491-90845', '13381765960', '1202-1528457643586-20001', 1, '2019-05-28 08:55:14'),\
('6adb-1559465546756-61983', '13381765960', '1202-1528457643586-10003', 0, '2019-06-02 04:52:26'),\
('78b5-1560067123517-64366', '13381765962', '1202-1528457643586-10000', 0, '2019-06-09 03:58:43'),\
('845c-1556873105670-12402', '13381765961', '1202-1528457643586-20000', 1, '2019-05-03 04:45:05'),\
('8e25-1559047993395-07533', '13381765960', '1202-1528457643586-20003', 1, '2019-05-28 08:53:13'),\
('8e4c-1560067290029-43264', '13381765962', '1202-1528457643586-20003', 1, '2019-06-09 04:01:30'),\
('93b8-1559048033151-35452', '13381765960', '1202-1528457643586-30001', 2, '2019-05-28 08:53:53'),\
('97dc-1556957881179-21631', '13381765963', '1202-1528457643586-30002', 2, '2019-05-04 04:18:01');\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `Likes_comments`\
--\
\
CREATE TABLE `Likes_comments` (\
  `likes_comments_id` char(24) NOT NULL,\
  `iphone` char(11) DEFAULT NULL,\
  `be_likes_comments_id` char(24) DEFAULT NULL,\
  `likes_comments_time` datetime DEFAULT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `ModifyCode`\
--\
\
CREATE TABLE `ModifyCode` (\
  `code_id` char(32) NOT NULL,\
  `iphone` char(11) DEFAULT NULL,\
  `codes` int(11) DEFAULT NULL,\
  `gain_time` datetime DEFAULT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `ModifyCode`\
--\
\
INSERT INTO `ModifyCode` (`code_id`, `iphone`, `codes`, `gain_time`) VALUES\
('1187c03c1557541822675ad9cb682bee', '13381765960', 21128, '2019-06-09 10:30:23'),\
('12de09ea1560056766083b1bc58ed6e2', '13381765960', 67282, '2019-06-09 01:06:06'),\
('12de09ea1560056766083b1bc58ed6e3', '15801824890', 67631, '2019-06-10 10:35:36'),\
('131591301560062029522d20d5a81fb5', '15021653540', 17593, '2019-06-09 02:33:49'),\
('1430db7215600570620850e4aea0486b', '15021653540', 48239, '2019-06-09 01:11:02'),\
('14f80abc15600595511208924ed83dfb', '13381765960', 23899, '2019-06-09 01:52:31'),\
('15386ba51560062350468f87fbbea6e6', '13381765960', 62438, '2019-06-09 02:39:10'),\
('153a559215575420443706ec102cf84d', '13381765960', 38344, '2019-06-09 10:34:04'),\
('15a55a5415600620287454325dd7f549', '15021653540', 24344, '2019-06-09 02:34:49'),\
('16a5b8d91560059872294b6e685ba499', '13381765960', 41342, '2019-06-09 01:57:52'),\
('240522711560065272801a6b279d08d2', '13381765960', 44099, '2019-06-09 03:28:54'),\
('2f6852061560133811597c058f71f7ac', '15801824890', 67666, '2019-06-10 10:30:12'),\
('4f75-1557539929070-57193', '15021653540', 99319, '2019-06-09 02:34:24'),\
('57668aa21560133942610b4bd12107e2', '13381765960', 48906, '2019-06-10 10:32:23'),\
('60c7441015600590776338ea7dab46e4', '13381765960', 61443, '2019-06-09 01:44:37'),\
('6684a55b1560061672874b9d2c6d3f77', '15021653540', 30778, '2019-06-09 02:27:53'),\
('7b3ace621560061955989decea22942c', '15021653540', 54228, '2019-06-09 02:33:36'),\
('9c0e09a515600577996336349a5643e3', '15021653540', 46775, '2019-06-09 01:23:20'),\
('c0d18d3e1560059694138f69c950224b', '13381765960', 71424, '2019-06-09 01:54:54'),\
('c4c5076d1557541131543246294a46b2', '13381765960', 19367, '2019-06-09 10:18:51'),\
('d40992cb156005919841001f539a280f', '13381765960', 30152, '2019-06-09 01:46:38'),\
('d94206d515600618380467b80bdc1bcb', '13381765960', 29976, '2019-06-09 02:30:38'),\
('e35d9c981560056566889f252c23b2a9', '13381765960', 91697, '2019-06-09 01:02:47'),\
('e593dfcc15600652766193fd2a63026a', '13381765960', 22547, '2019-06-09 03:27:57'),\
('e59a0a6d1560065274222ba025902ef9', '13381765960', 83046, '2019-06-09 03:28:54'),\
('eaa95f0715600619535509ec169f5ed3', '15021653540', 49773, '2019-06-09 02:33:35'),\
('f559b78f1560061960190bd6fdb96778', '15021653540', 67152, '2019-06-09 02:32:40');\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `UserAttention`\
--\
\
CREATE TABLE `UserAttention` (\
  `attention_id` char(24) NOT NULL,\
  `iphone_1` char(11) DEFAULT NULL,\
  `iphone_2` char(11) DEFAULT NULL,\
  `attention_time` datetime DEFAULT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `UserAttention`\
--\
\
INSERT INTO `UserAttention` (`attention_id`, `iphone_1`, `iphone_2`, `attention_time`) VALUES\
('1202-1528457643586-80000', '13381765961', '13381765960', '2019-04-23 09:43:09'),\
('1202-1528457643586-80001', '13381765960', '13381765961', '2019-04-23 09:43:39'),\
('269b-1560045869182-69070', '13381765963', '13381765961', '2019-06-09 10:04:29'),\
('38ee-1560043123067-18673', '13381765960', '13381765962', '2019-06-09 09:18:43'),\
('5b18-1556953318498-52236', '13381765963', '13381765960', '2019-05-04 03:01:58'),\
('7d92-1557319138071-64674', '13381765963', '13381765962', '2019-05-08 08:38:58');\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `UserList`\
--\
\
CREATE TABLE `UserList` (\
  `iphone` char(11) NOT NULL,\
  `name` varchar(20) NOT NULL,\
  `password` varchar(20) DEFAULT NULL,\
  `pic` varchar(500) DEFAULT NULL,\
  `gender` int(11) DEFAULT '0',\
  `birth` date DEFAULT NULL,\
  `motto` varchar(200) DEFAULT NULL,\
  `register_time` datetime DEFAULT NULL,\
  `wechat` char(24) DEFAULT NULL,\
  `qq` int(11) DEFAULT NULL,\
  `weibo` char(24) DEFAULT NULL,\
  `address` varchar(100) DEFAULT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `UserList`\
--\
\
INSERT INTO `UserList` (`iphone`, `name`, `password`, `pic`, `gender`, `birth`, `motto`, `register_time`, `wechat`, `qq`, `weibo`, `address`) VALUES\
('13381765960', '
\f1 \'ca\'af\'ea\'bb
\f0 ', 'a1234567', 'http://111.231.141.185/pet/image/pet-banner-4.jpg', 1, '1996-05-30', '
\f1 \'b9\'c2\'b6\'c0\'ca\'c7\'d2\'bb\'d6\'d6\'cc\'ac\'b6\'c8
\f0 ', '2019-04-20 03:01:39', '', 0, '', '
\f1 \'b1\'b1\'be\'a9
\f0 -
\f1 \'b1\'b1\'be\'a9
\f0 -
\f1 \'b6\'ab\'b3\'c7\'c7\'f8
\f0 '),\
('13381765961', '
\f1 \'d2\'b6\'b7\'b2
\f0 ', 'a123456', 'http://111.231.141.185/pet/image/pet-banner-7.jpg', 1, '1994-09-28', 'I thought you were the flower of my hit.It turned out that I just happened to pass your bloom.', '2019-04-20 03:01:47', '', 0, '', '
\f1 \'b9\'e3\'b6\'ab
\f0 -
\f1 \'b9\'e3\'d6\'dd
\f0 -
\f1 \'d4\'f6\'b3\'c7\'ca\'d0
\f0 '),\
('13381765962', '
\f1 \'b3\'fe\'b7\'e7
\f0 ', 'a123456', 'http://111.231.141.185/pet/image/pet-banner-11.jpg', 2, '1994-09-28', '
\f1 \'b9\'c2\'b6\'c0\'ca\'c7\'d2\'bb\'d6\'d6\'cc\'ac\'b6\'c8
\f0 ', '2019-04-20 03:01:59', '', 0, '', '
\f1 \'cc\'a8\'cd\'e5
\f0 -
\f1 \'cc\'a8\'cd\'e5
\f0 -
\f1 \'cc\'a8\'b1\'b1\'ca\'d0
\f0 '),\
('13381765963', '
\f1 \'ba\'dd\'c8\'cb\'b4\'f3\'b5\'db
\f0 ', 'a123456', 'http://111.231.141.185/pet/image/pet-banner-9.jpg', 2, '1994-09-28', 'Not for Immortality,only for you in the red dust ,I will wait for you to return.', '2019-04-20 03:02:08', '', 0, '', '');\
\
--\
-- Indexes for dumped tables\
--\
\
--\
-- Indexes for table `Banner`\
--\
ALTER TABLE `Banner`\
  ADD PRIMARY KEY (`id`);\
\
--\
-- Indexes for table `Collect`\
--\
ALTER TABLE `Collect`\
  ADD PRIMARY KEY (`collect_id`),\
  ADD KEY `fk_Co_id_1` (`be_collect_id`),\
  ADD KEY `fk_Co_id_4` (`iphone`);\
\
--\
-- Indexes for table `Comments`\
--\
ALTER TABLE `Comments`\
  ADD PRIMARY KEY (`comment_id`),\
  ADD KEY `fk_C_id_1` (`be_commend_id`),\
  ADD KEY `fk_C_id_4` (`user_id`);\
\
--\
-- Indexes for table `DataList`\
--\
ALTER TABLE `DataList`\
  ADD PRIMARY KEY (`id`),\
  ADD KEY `fk_DataList_id_1` (`iphone`);\
\
--\
-- Indexes for table `Likes`\
--\
ALTER TABLE `Likes`\
  ADD PRIMARY KEY (`likes_id`),\
  ADD KEY `fk_Li_id_1` (`be_Like_id`),\
  ADD KEY `fk_Li_id_4` (`iphone`);\
\
--\
-- Indexes for table `Likes_comments`\
--\
ALTER TABLE `Likes_comments`\
  ADD PRIMARY KEY (`likes_comments_id`),\
  ADD KEY `fk_Li_Co_id_1` (`be_likes_comments_id`),\
  ADD KEY `fk_Li_Co_id_2` (`iphone`);\
\
--\
-- Indexes for table `ModifyCode`\
--\
ALTER TABLE `ModifyCode`\
  ADD PRIMARY KEY (`code_id`);\
\
--\
-- Indexes for table `UserAttention`\
--\
ALTER TABLE `UserAttention`\
  ADD PRIMARY KEY (`attention_id`),\
  ADD KEY `fk_u_id_1` (`iphone_1`),\
  ADD KEY `fk_u_id_2` (`iphone_2`);\
\
--\
-- Indexes for table `UserList`\
--\
ALTER TABLE `UserList`\
  ADD PRIMARY KEY (`iphone`);\
\
--\
-- Constraints for dumped tables\
--\
\
--\
-- Constraints for table `Collect`\
--\
ALTER TABLE `Collect`\
  ADD CONSTRAINT `fk_Co_id_1` FOREIGN KEY (`be_collect_id`) REFERENCES `DataList` (`id`),\
  ADD CONSTRAINT `fk_Co_id_4` FOREIGN KEY (`iphone`) REFERENCES `UserList` (`iphone`);\
\
--\
-- Constraints for table `Comments`\
--\
ALTER TABLE `Comments`\
  ADD CONSTRAINT `fk_C_id_1` FOREIGN KEY (`be_commend_id`) REFERENCES `DataList` (`id`),\
  ADD CONSTRAINT `fk_C_id_4` FOREIGN KEY (`user_id`) REFERENCES `UserList` (`iphone`);\
\
--\
-- Constraints for table `DataList`\
--\
ALTER TABLE `DataList`\
  ADD CONSTRAINT `fk_DataList_id_1` FOREIGN KEY (`iphone`) REFERENCES `UserList` (`iphone`);\
\
--\
-- Constraints for table `Likes`\
--\
ALTER TABLE `Likes`\
  ADD CONSTRAINT `fk_Li_id_1` FOREIGN KEY (`be_Like_id`) REFERENCES `DataList` (`id`),\
  ADD CONSTRAINT `fk_Li_id_4` FOREIGN KEY (`iphone`) REFERENCES `UserList` (`iphone`);\
\
--\
-- Constraints for table `Likes_comments`\
--\
ALTER TABLE `Likes_comments`\
  ADD CONSTRAINT `fk_Li_Co_id_1` FOREIGN KEY (`be_likes_comments_id`) REFERENCES `Comments` (`comment_id`),\
  ADD CONSTRAINT `fk_Li_Co_id_2` FOREIGN KEY (`iphone`) REFERENCES `UserList` (`iphone`);\
\
--\
-- Constraints for table `UserAttention`\
--\
ALTER TABLE `UserAttention`\
  ADD CONSTRAINT `fk_u_id_1` FOREIGN KEY (`iphone_1`) REFERENCES `UserList` (`iphone`),\
  ADD CONSTRAINT `fk_u_id_2` FOREIGN KEY (`iphone_2`) REFERENCES `UserList` (`iphone`);\
}