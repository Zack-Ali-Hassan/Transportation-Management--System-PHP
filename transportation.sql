-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2024 at 10:20 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transportation`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_system_authority_sp` (IN `_user_id` VARCHAR(250) CHARSET utf8)   BEGIN

SELECT category.category_id, category.category_name, 
system_links.link_id, system_links.link_name 
FROM `user_authority` left JOIN system_links 
on user_authority.action = system_links.link_id LEFT JOIN category
on system_links.category_id = category.category_id
WHERE user_authority.user_id = _user_id ORDER BY category.role, system_links.link_id;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_system_menu_sp` (IN `_user_id` VARCHAR(250) CHARSET utf8)   BEGIN

SELECT category.category_id, category.category_name, category.role,system_links.link_id, system_links.link_name
, system_links.link, system_links.link_icon FROM `user_authority` left JOIN system_links 
on user_authority.action = system_links.link_id LEFT JOIN category
on system_links.category_id = category.category_id
WHERE user_authority.user_id = _user_id GROUP BY system_links.link_id ORDER BY category.category_id, system_links.link_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_sp` (IN `_username` VARCHAR(250) CHARSET utf8, IN `_password` VARCHAR(250) CHARSET utf8)   BEGIN
IF EXISTS(SELECT * FROM users WHERE users.username = _username and users.password = MD5(_password))THEN
IF EXISTS(SELECT * from users WHERE users.username = _username and users.status = 'active') THEN
SELECT * from users where users.username = _username;
ELSE
SELECT 'Lock' Msg;
END IF;
ELSE
SELECT 'Deny' Msg;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `order_report_sp` (IN `_customer_id` INT, IN `_status` VARCHAR(50) CHARSET utf8)   BEGIN

SELECT Orders.status, Customers.Name AS CustomerName, Orders.pickup_location, Orders.delivery_location, Orders.Weight, Vehicles.vehicle_number AS AssignedVehicle, date(Orders.delivery_date) delivery_date
FROM Orders
LEFT JOIN Customers ON Orders.customer_id = Customers.customer_id
LEFT JOIN Vehicles ON Orders.vehicle_id = Vehicles.vehicle_id
WHERE orders.customer_id = _customer_id and orders.status = _status;


END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(250) NOT NULL,
  `category_icon` varchar(250) NOT NULL,
  `role` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_icon`, `role`, `date`) VALUES
(2, 'Dashboard', 'fa-home', 'Dashboard', '2023-12-23 04:58:38'),
(3, 'Subscriber', 'fa-user', 'Subscriber', '2023-12-23 04:59:07'),
(4, 'Superadmin', 'fa-setting', 'Superadmin', '2023-12-23 07:58:20'),
(5, 'Reports', 'fas fa-file-alt	', 'Reports', '2023-12-27 18:04:12');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL DEFAULT 'Hodan',
  `mobile` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `gender`, `address`, `mobile`, `email`) VALUES
(1, 'username ahmed ali', 'male', 'Shibis', '618898998', 'ahmed@gmail.com'),
(3, 'ALia Hassan Ahmed', 'Male', 'Hodan', '615567686', 'alia@gmail.com'),
(6, 'Hanan Abdi Ahmed', 'female', 'Kaxda', '617878767', 'hanan@gmail.com'),
(22, 'Ayaanle Ahmed Hassan', 'male', 'Kaxda', '617781261', 'ay@res'),
(29, 'Iqro Ali Abdi', 'female', 'Mugadisho', '617781261', 'iqro123@gmail.com'),
(37, 'Ayaan Mohamed Abshir', 'female', 'Mugadisho', '617781261', 'ayaan@gmail.com'),
(38, 'Hafso Ahmed Ali', 'female', 'Mugadisho', '617781261', 'hafso@gmail.com'),
(39, 'Abdullahi Abdi Ahmed', 'male', 'Mugadisho', '617781277', 'abdullahiabdi@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `driver_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `VehicleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `name`, `mobile`, `email`, `VehicleID`) VALUES
(1, 'Ahmed Muktar Robow', '617787878', 'ahmed@gmail.com', 1),
(16, 'Ayaanle Ahmed Hassan', '615453423', 'ayaanle@gmail.com', 10),
(17, 'Ahmed yacquub Ali', '618897867', 'ahmedyacqub@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fuelrecords`
--

CREATE TABLE `fuelrecords` (
  `fuel_id` int(11) NOT NULL,
  `fuel_type` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `fueling_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fuelrecords`
--

INSERT INTO `fuelrecords` (`fuel_id`, `fuel_type`, `quantity`, `cost`, `fueling_date`, `vehicle_id`) VALUES
(3, 'baasin', 50, 50.00, '2023-12-18 15:43:44', 1),
(5, 'baasin', 30, 60.00, '2023-12-18 15:46:26', 1),
(6, 'baasin', 10, 15.00, '2023-12-26 17:35:10', 1),
(8, 'baasin', 300, 3000.00, '2023-12-29 15:59:50', 10),
(9, 'baasin', 300, 600.00, '2023-12-30 09:37:14', 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `due_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `customer_id`, `amount`, `payment_status`, `due_date`) VALUES
(1, 6, 80.00, 'unpaid', '2023-12-29 12:27:21'),
(2, 3, 800.00, 'partial', '2023-12-29 12:27:31'),
(7, 22, 300.00, 'unpaid', '2023-12-18 18:31:42'),
(10, 6, 320.00, 'unpaid', '2023-12-29 10:33:28');

-- --------------------------------------------------------

--
-- Table structure for table `maintenancerecords`
--

CREATE TABLE `maintenancerecords` (
  `maintenance_id` int(11) NOT NULL,
  `Maintenance_type` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `maintenance_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenancerecords`
--

INSERT INTO `maintenancerecords` (`maintenance_id`, `Maintenance_type`, `description`, `cost`, `maintenance_date`, `vehicle_id`) VALUES
(3, 'dhaqid baabur markii 1 -aad', 'description', 6.00, '2023-12-15 16:19:36', 1),
(4, 'dhaqid baabur', 'waxaa la dhaqay baaburka', 6.00, '2023-12-15 16:15:37', 2),
(5, 'Waxaan  baaburka ku xirnay leerar gaduud ah', 'Waxaan  baaburka ku xirnay leerar gaduud ah', 100.00, '2023-12-18 16:26:56', 10),
(9, 'hgjgh', 'jjgkj', 300.00, '2023-12-28 18:01:52', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `pickup_location` varchar(255) NOT NULL,
  `delivery_location` varchar(255) NOT NULL,
  `weight` varchar(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `delivery_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `pickup_location`, `delivery_location`, `weight`, `status`, `delivery_date`, `customer_id`, `vehicle_id`) VALUES
(1, 'Kaxda', 'Guriel', '30 kg', 'Pending', '2023-12-15 16:38:35', 1, 1),
(3, 'Guriel', 'Mataban', '50 kg', 'delivered', '2023-12-29 16:22:04', 1, 1),
(22, 'Guriel', 'Mataban', '60 kg', 'intransit', '2023-12-28 15:43:34', 1, 2),
(23, 'Galkacyo', 'Hobyo', '80 kg', 'delivered', '2023-12-28 15:44:01', 1, 10),
(24, 'Boosaso', 'Garowe', '90 kg', 'intransit', '2023-12-28 15:44:30', 1, 10),
(25, 'Boosaso', 'Hobyo', '100 kg', 'intransit', '2023-12-28 15:44:54', 3, 2),
(27, 'Guriel', 'Mataban', '30 kg', 'pending', '2023-12-29 16:23:19', 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `customer_id`, `Amount`, `payment_method`, `date`) VALUES
(3, 3, 700.00, 'evcPlus', '2023-12-19 18:01:11'),
(4, 6, 12.00, 'evcPlus', '2023-12-20 09:13:41'),
(5, 3, 122.00, 'evcPlus', '2023-12-22 06:41:50'),
(6, 6, 200.00, 'evcPlus', '2023-12-29 10:38:05'),
(7, 38, 900.00, 'evcPlus', '2023-12-29 18:28:37'),
(8, 38, 200.00, 'eDahab', '2023-12-30 09:30:54');

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `route_id` int(11) NOT NULL,
  `source_location` varchar(255) NOT NULL,
  `destination_location` varchar(255) NOT NULL,
  `distance` varchar(20) NOT NULL,
  `estimated_time` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`route_id`, `source_location`, `destination_location`, `distance`, `estimated_time`) VALUES
(1, 'Bakaaro', 'Kaxda', '2 km', '1 hr'),
(3, 'Bakaaro', 'Guriel', '600 km', '24 hr'),
(12, 'Dhahar', 'Badhan', '200 km', '24 hr');

-- --------------------------------------------------------

--
-- Table structure for table `system_actions`
--

CREATE TABLE `system_actions` (
  `action_id` int(11) NOT NULL,
  `action_name` varchar(250) NOT NULL,
  `action` varchar(50) NOT NULL,
  `link_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_actions`
--

INSERT INTO `system_actions` (`action_id`, `action_name`, `action`, `link_id`, `date`) VALUES
(1, 'Register user', 'update_system_action', 1, '2023-12-23 07:45:13'),
(2, 'Update users', 'update_user', 1, '2023-12-23 07:45:55'),
(3, 'Delete users', 'delete_user', 1, '2023-12-23 07:46:19'),
(4, 'Register customer', 'register_customer', 2, '2023-12-24 15:52:03'),
(5, 'Update customer', 'update_customer', 2, '2023-12-24 15:52:39'),
(6, 'Delete customer', 'delete_customer', 2, '2023-12-24 15:53:37'),
(7, 'Dashboard', 'dashboard', 3, '2023-12-24 15:55:37'),
(8, 'Regsiter route', 'register_route', 4, '2023-12-24 15:57:51'),
(9, 'Update route', 'update_route', 4, '2023-12-24 15:58:23'),
(10, 'Delete route', 'delete_route', 4, '2023-12-24 15:59:02'),
(11, 'Regsiter vehicle', 'register_vehicle', 5, '2023-12-24 16:00:57'),
(12, 'Update  vehicle', 'update_vehicle', 5, '2023-12-24 16:01:41'),
(13, 'Delete vehicle', 'delete_vehicle', 5, '2023-12-24 16:02:22'),
(14, 'Register driver', 'register_driver', 6, '2023-12-24 16:04:37'),
(15, 'Update driver', 'update_driver', 6, '2023-12-24 16:04:53'),
(16, 'Delete driver', 'delete_driver', 6, '2023-12-24 16:05:08'),
(17, 'Register fuel record', 'register_fuel_record', 7, '2023-12-24 16:06:09'),
(18, 'Update fuel record', 'update_fuel_record', 7, '2023-12-24 16:06:34'),
(19, 'Delete fuel record', 'delete_fuel_record', 7, '2023-12-24 16:07:01'),
(20, 'Register maintenance', 'register_maintenance_record', 8, '2023-12-24 16:07:48'),
(21, 'Update maintenance', 'update_maintenance_record', 8, '2023-12-24 16:08:41'),
(22, 'Delete maintenance', 'delete_maintenance_record', 8, '2023-12-24 16:09:03'),
(23, 'Register order', 'register_order', 9, '2023-12-24 16:09:49'),
(24, 'Update order', 'update_order', 9, '2023-12-24 16:10:00'),
(25, 'Delete order', 'delete_order', 9, '2023-12-24 16:10:18'),
(26, 'Register invoice', 'register_invoice', 10, '2023-12-24 16:10:47'),
(27, 'Update invoice', 'update_invoice', 10, '2023-12-24 16:10:58'),
(28, 'Delete invoice', 'delete_invoice', 10, '2023-12-24 16:11:11'),
(29, 'Regsiter payment', 'register_payment', 11, '2023-12-24 16:11:57'),
(30, 'Update payment', 'update_payment', 11, '2023-12-24 16:12:07'),
(31, 'Delete payment', 'delete_payment', 11, '2023-12-24 16:12:19'),
(32, 'Register category', 'register_category', 14, '2023-12-24 16:12:58'),
(33, 'Update category', 'update_category', 14, '2023-12-24 16:13:19'),
(34, 'Delete category', 'delete_category', 14, '2023-12-24 16:13:32'),
(35, 'Register system link', 'register_system_link', 15, '2023-12-24 16:14:08'),
(36, 'Update system link', 'update_system_link', 15, '2023-12-24 17:35:32'),
(37, 'Delete system link', 'delete_system_link', 15, '2023-12-24 16:14:43'),
(38, 'Register system action', 'register_system_action', 17, '2023-12-24 16:15:12'),
(39, 'Update system action', 'update_system_action', 17, '2023-12-24 16:15:25'),
(40, 'Delete system action', 'delete_system_action', 17, '2023-12-24 16:15:41'),
(41, 'Update system link', 'update_system_link', 15, '2023-12-24 16:16:59'),
(42, 'Login', 'login', 12, '2023-12-27 17:20:40'),
(43, 'Read system authority view', 'read_system_authority_view', 18, '2023-12-27 17:22:45'),
(44, 'Register  user authority', 'register_user_authority', 18, '2023-12-27 17:23:09'),
(45, 'Get system authority sp', 'get_system_authority_sp', 18, '2023-12-27 17:23:52'),
(46, 'get system menu sp', 'get_system_menu_sp', 18, '2023-12-27 17:24:13');

-- --------------------------------------------------------

--
-- Stand-in structure for view `system_auth_view`
-- (See below for the actual view)
--
CREATE TABLE `system_auth_view` (
`category_id` int(11)
,`category_name` varchar(250)
,`role` varchar(50)
,`link_id` int(11)
,`link_name` varchar(250)
);

-- --------------------------------------------------------

--
-- Table structure for table `system_links`
--

CREATE TABLE `system_links` (
  `link_id` int(11) NOT NULL,
  `link_icon` varchar(250) NOT NULL,
  `link_name` varchar(250) NOT NULL,
  `link` varchar(250) NOT NULL,
  `category_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_links`
--

INSERT INTO `system_links` (`link_id`, `link_icon`, `link_name`, `link`, `category_id`, `date`) VALUES
(1, 'fa-solid fa-user', 'Users', 'users.php', 4, '2023-12-26 17:21:04'),
(2, 'fa-solid fa-users', 'Customers', 'customer.php', 3, '2023-12-26 17:21:51'),
(3, 'ti ti-layout-dashboard', 'Dashboard', 'index.php', 2, '2023-12-26 17:29:59'),
(4, 'fas fa-route', 'Routes', 'routes.php', 3, '2023-12-26 17:22:35'),
(5, 'fas fa-subway', 'Vehicles', 'vehicle.php', 3, '2023-12-26 17:22:50'),
(6, 'fas fa-car-crash', 'Drivers', 'driver.php', 3, '2023-12-26 17:23:04'),
(7, 'fas fa-gas-pump', 'Fuel records', 'fuel_record.php', 3, '2023-12-26 17:23:23'),
(8, 'fas fa-tools', 'Maintenance records', 'maintenance_record.php', 3, '2023-12-26 17:23:38'),
(9, 'fas fa-shopping-basket', 'Orders', 'orders.php', 3, '2023-12-26 17:24:09'),
(10, 'fas fa-file-invoice', 'Invoices', 'invoice.php', 3, '2023-12-26 17:24:28'),
(11, 'fas fa-file-invoice-dollar', 'Payments', 'payments.php', 3, '2023-12-26 17:24:45'),
(14, 'fas fa-folder', 'Category', 'category.php', 4, '2023-12-26 17:27:36'),
(15, 'fas fa-link', 'System links', 'system_links.php', 4, '2023-12-26 17:27:53'),
(17, 'fas fa-cogs', 'System action', 'system_action.php', 4, '2023-12-26 17:28:08'),
(18, 'fas fa-user-shield', 'User authority', 'user_authority.php', 4, '2023-12-27 16:44:50'),
(20, 'fas fa-shopping-basket', 'Order report', 'order_report.php', 5, '2023-12-27 18:07:42'),
(21, 'fas fa-gas-pump', 'Fuel report', 'fuel_report.php', 5, '2023-12-27 18:08:06'),
(22, 'fas fa-tools', 'Maintenance report', 'maintenance_report.php', 5, '2023-12-27 18:08:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_image` varchar(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `user_image`, `type`, `status`, `date`) VALUES
('HL001', 'zack', 'zack@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL001.png', 'admin', 'active', '2023-12-29 18:31:09'),
('HL002', 'adan', 'adan@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL002.png', 'user', 'active', '2023-12-27 16:52:39'),
('HL003', 'abshir', 'abshir@gmail.com', 'd9b1d7db4cd6e70935368a1efb10e377', 'HL003.png', 'user', 'active', '2023-12-29 03:17:12'),
('HL004', 'hussein', 'hussein@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL004.png', 'user', 'active', '2023-12-22 12:10:38'),
('HL005', 'salaxudin', 'salaxudin@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL005.png', 'user', 'active', '2023-12-22 12:11:20'),
('HL006', 'abdullahi', 'abdullahi@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL006.png', 'user', 'active', '2023-12-22 12:12:09'),
('HL007', 'najib', 'najib@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL007.png', 'user', 'active', '2023-12-22 12:13:04'),
('HL008', 'kaapearaysane', 'kaapearaysane@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL008.png', 'user', 'active', '2023-12-28 07:30:12'),
('HL009', 'maryan', 'maryan@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL009.png', 'user', 'active', '2023-12-29 11:11:51'),
('HL010', 'Hamdi', 'hamdi@gmail.com', '202cb962ac59075b964b07152d234b70', 'HL010.png', 'user', 'active', '2023-12-29 11:22:49');

-- --------------------------------------------------------

--
-- Table structure for table `user_authority`
--

CREATE TABLE `user_authority` (
  `user_authority_id` int(11) NOT NULL,
  `user_id` varchar(15) NOT NULL,
  `action` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_authority`
--

INSERT INTO `user_authority` (`user_authority_id`, `user_id`, `action`) VALUES
(19, 'HL001', 3),
(20, 'HL001', 20),
(21, 'HL001', 21),
(22, 'HL001', 22),
(23, 'HL001', 2),
(24, 'HL001', 4),
(25, 'HL001', 5),
(26, 'HL001', 6),
(27, 'HL001', 7),
(28, 'HL001', 8),
(29, 'HL001', 9),
(30, 'HL001', 10),
(31, 'HL001', 11),
(32, 'HL001', 1),
(33, 'HL001', 14),
(34, 'HL001', 15),
(35, 'HL001', 17),
(36, 'HL001', 18),
(37, 'HL002', 3),
(38, 'HL002', 20),
(39, 'HL002', 21),
(40, 'HL002', 22),
(41, 'HL002', 2),
(42, 'HL002', 4),
(43, 'HL002', 5),
(44, 'HL002', 6),
(45, 'HL002', 7),
(46, 'HL002', 8),
(47, 'HL002', 9),
(48, 'HL002', 10),
(49, 'HL002', 11);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `vehicle_number` varchar(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `fual_type` varchar(50) NOT NULL,
  `capacity` varchar(50) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `vehicle_number`, `type`, `fual_type`, `capacity`, `location`, `status`) VALUES
(1, '622211', 'tareen', 'Baasin', '100.00', 'Hargeysa', 'active'),
(2, '622233', 'bajaaj', 'Baasin', '100,000 kg', 'Boosaso', 'active'),
(10, '622266', 'bajaaj', 'Naafto', '20 kg', 'Guriel', 'active'),
(14, '343434', 'bmw', 'Naafto', '100.00', 'mogadishu', 'active');

-- --------------------------------------------------------

--
-- Structure for view `system_auth_view`
--
DROP TABLE IF EXISTS `system_auth_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `system_auth_view`  AS SELECT `category`.`category_id` AS `category_id`, `category`.`category_name` AS `category_name`, `category`.`role` AS `role`, `system_links`.`link_id` AS `link_id`, `system_links`.`link_name` AS `link_name` FROM (`category` left join `system_links` on(`category`.`category_id` = `system_links`.`category_id`)) ORDER BY `category`.`role` ASC, `system_links`.`link_id` ASC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `mobile` (`mobile`,`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_id`),
  ADD UNIQUE KEY `mobile` (`mobile`,`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `VehicleID` (`VehicleID`);

--
-- Indexes for table `fuelrecords`
--
ALTER TABLE `fuelrecords`
  ADD PRIMARY KEY (`fuel_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `maintenancerecords`
--
ALTER TABLE `maintenancerecords`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`route_id`);

--
-- Indexes for table `system_actions`
--
ALTER TABLE `system_actions`
  ADD PRIMARY KEY (`action_id`),
  ADD KEY `system_action_link` (`link_id`);

--
-- Indexes for table `system_links`
--
ALTER TABLE `system_links`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `system_link_category` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_authority`
--
ALTER TABLE `user_authority`
  ADD PRIMARY KEY (`user_authority_id`),
  ADD KEY `user_authority_system_link_action` (`action`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD UNIQUE KEY `vehicle_number` (`vehicle_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `fuelrecords`
--
ALTER TABLE `fuelrecords`
  MODIFY `fuel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `maintenancerecords`
--
ALTER TABLE `maintenancerecords`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `route_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `system_actions`
--
ALTER TABLE `system_actions`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `system_links`
--
ALTER TABLE `system_links`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_authority`
--
ALTER TABLE `user_authority`
  MODIFY `user_authority_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`VehicleID`) REFERENCES `vehicles` (`vehicle_id`);

--
-- Constraints for table `fuelrecords`
--
ALTER TABLE `fuelrecords`
  ADD CONSTRAINT `fuelrecords_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `maintenancerecords`
--
ALTER TABLE `maintenancerecords`
  ADD CONSTRAINT `maintenancerecords_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `system_actions`
--
ALTER TABLE `system_actions`
  ADD CONSTRAINT `system_action_link` FOREIGN KEY (`link_id`) REFERENCES `system_actions` (`action_id`) ON UPDATE CASCADE;

--
-- Constraints for table `system_links`
--
ALTER TABLE `system_links`
  ADD CONSTRAINT `system_link_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE;

--
-- Constraints for table `user_authority`
--
ALTER TABLE `user_authority`
  ADD CONSTRAINT `user_authority_system_link_action` FOREIGN KEY (`action`) REFERENCES `system_links` (`link_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
