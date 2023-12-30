<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Transportation System</title>
  <!-- <link rel="shortcut icon" type="image/png" href="../../assets/images/logos/fav.png" /> -->
  <!-- Include Font Awesome library -->
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.min.css" />
  <link rel="stylesheet" href="../ztoaster-main/ztoaster.css">
  <link rel="stylesheet" href="../ztoaster-main/ztoaster.min.css">
</head>

<body>
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-behavior="fixed" data-header-behavior="fixed">
    <!-- Sidebar Start --> 
    <aside class="left-sidebar">
      <!-- Sidebar scroll-->
      <div >
        <div class="brand-logo d-flex align-items-center justify-content-center">
          <a href="./index.php" class="text-nowrap logo-img">
            <!-- <img src="../../assets/images/logos/fav.png" width="90" height="90" alt="not found" class="mt-2" /> -->
            <h2><span style="color: white; font-weight : bold; font-size : 30px;">AL-HILAAL TMS</span></h2>
          </a>
          <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
            <i class="ti ti-x fs-8"></i>
          </div>
        </div>
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
       
          <ul id="user_menu" name= "user_menu"> </ul>
          <!-- <ul id="sidebarnav">
            <li class="nav-small-cap">
              <i class=""></i>
              <span class="hide-menu "> Home</span>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./index.php" aria-expanded="false">
                <span>
                  <i class="ti ti-layout-dashboard"></i>
                </span>
                <span class="hide-menu  mx-2">Dashboard</span>
              </a>
            </li>
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">UI COMPONENTS</span>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/users.php" aria-expanded="false">
                <span>
                  <i class="fa-solid fa-user"></i>
                </span>
                <span class="hide-menu">Users</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/customer.php" aria-expanded="false">
                <span>
                <i class="fa-solid fa-users"></i>
                </span>
                <span class="hide-menu">Customers</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/routes.php" aria-expanded="false">
                <span>
                  <i class="fas fa-route"></i>
                </span>
                <span class="hide-menu">Routes</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/vehicle.php" aria-expanded="false">
                <span>
                  <i class="fas fa-subway"></i>
                </span>
                <span class="hide-menu">Vehicles</span>
              </a>
            </li>

            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/driver.php" aria-expanded="false">
                <span>
                  <i class="fas fa-car-crash"></i>
                </span>
                <span class="hide-menu">Drivers</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/fuel_record.php" aria-expanded="false">
                <span>
                  <i class="fas fa-gas-pump"></i>
                </span>
                <span class="hide-menu">Fual records</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/maintenance_record.php" aria-expanded="false">
                <span>
                  <i class="fas fa-tools"></i>
                </span>
                <span class="hide-menu">Maintenance records</span>
              </a>
            </li>

            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/orders.php" aria-expanded="false">
                <span>
                  <i class="fas fa-shopping-basket"></i>
                </span>
                <span class="hide-menu">Orders</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/invoice.php" aria-expanded="false">
                <span>
                  <i class="fas fa-file-invoice"></i>
                </span>
                <span class="hide-menu">Invoices</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/payments.php" aria-expanded="false">
                <span>
                  <i class="fas fa-file-invoice-dollar"></i>
                </span>
                <span class="hide-menu">Payments</span>
              </a>
            </li>
           
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">AUTH</span>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/Login.php" aria-expanded="false">
                <span>
                  <i class="ti ti-login"></i>
                </span>
                <span class="hide-menu">Login</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/register.php" aria-expanded="false">
                <span>
                  <i class="ti ti-user-plus"></i>
                </span>
                <span class="hide-menu">Register</span>
              </a>
            </li>
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">REPORTS</span>
            </li>

            <li class="sidebar-item">
              <a class="sidebar-link" href="../views/users.php" aria-expanded="false">
                <span>
                  <i class="ti ti-aperture"></i>
                </span>
                <span class="hide-menu">Report 1</span>
              </a>
            </li>
          </ul> -->

        </nav>
        <!-- End Sidebar navigation -->
      </div>
      <!-- End Sidebar scroll-->
    </aside>
    <!--  Sidebar End -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="../js/sidebar.js"></script>