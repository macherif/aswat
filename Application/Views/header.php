<?php
/**
 * @file header.php
 */
 ?>
<!DOCTYPE html>
<html ng-app="Aswat">
	<head>
		<meta charset="utf-8">
		<title>ASWAT ASSESSEMENT</title>
		<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
		<link rel="stylesheet" href="assets/css/bootstrap.min.css">
		<link rel="stylesheet" href="assets/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="assets/css/ui-grid.min.css">
		<link rel="stylesheet" href="assets/less/ui-grid.less">
		<!--[if lt IE 9]>
		<script src="assets/js/html5shiv.js"></script>
		<![endif]-->
		<style>
			.my-drop-zone {
				border: dotted 3px lightgray;
			}
			.nv-file-over {
				border: dotted 3px red;
			}/* Default class applied to drop zones on over */
			.another-file-over-class {
				border: dotted 3px green;
			}

			html, body {
				height: 100%;
			}

			canvas {
				background-color: #f3f3f3;
				-webkit-box-shadow: 3px 3px 3px 0 #e3e3e3;
				-moz-box-shadow: 3px 3px 3px 0 #e3e3e3;
				box-shadow: 3px 3px 3px 0 #e3e3e3;
				border: 1px solid #c3c3c3;
				height: 100px;
				margin: 6px 0 0 6px;
			}
			
		</style>
	</head>
	<body style="background-color: #f1f2f6">
		<div class="container">
        <div class="header">
                <nav>
                  <ul class="nav nav-pills pull-right" bs-active-link>
                        <li   class="hidden" role="presentation">
                            <a href="#/home">Home</a>
                        </li>
                        <li class="hidden" role="presentation">
                            <a href="#/products">Products</a>
                        </li>
                        <li class="hidden" role="presentation">
                            <a href="#/categories">Categories</a>
                        </li>
                        <li class="hidden" role="presentation">
                            <a href="#/users">Users</a>
                        </li>
                        <li  class="hidden" role="presentation">
                            <a href="#/roles">Roles</a>
                        </li>
                        <li  class="hidden" role="presentation">
                            <a href="#/images">Images</a>
                        </li>
                        <li  class="hidden" role="presentation">
                            <a href="#/order">Shopping Cart</a>
                        </li>
                        <li class="hidden" role="presentation">
                            <a href="#/credential">Log In</a>
                        </li>
                        <li class="hidden" role="presentation">
                            <a href="#/signup">Sign In</a>
                        </li>
                        <li class="hidden" role="presentation">
                            <a href="#/logout">Log Out</a>
                        </li>
                        
                  </ul>
                </nav>
                <h3 class="text-muted" app-name></h3>
        </div>
			

			<div ng-view></div>
		</div>
