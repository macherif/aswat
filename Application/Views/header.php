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
			 .user-info {
			    max-width : 28%;
			    max-height : 200px;
			    /*background-color: white;*/
			    font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
			    border-radius: 10px;
			    border: #245580 inset;
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
                            <a href="#/signup">Sign In</a>
                        </li>
						<li class="hidden" role="presentation">
							<a href="#/credential">Log In</a>
						</li>
						<li class="hidden" role="presentation">
							<a href="#/logout">Log Out</a>
						</li>

					</ul>
				</nav>
				<h3 class="text-muted" app-name></h3>
			</div>
			<!-- BEGIN USER INFO !-->
			<header class="user-info" ng-show="isAuthorized()" ng-controller="Home">
			    <div class="paragraphs">
                  <div class="row">
                    <div class="span4">
                      <div class="clearfix content-heading">
                         <div ng-if="isAuthorized">
                    <div class="col-lg-4">
                        <img class="thumbnail" width = "48px" height="50px" ng-src="{{ currentUser.image }}" ng-title="{{ currentUser.image_title }}" ng-alt="{{ currentUser.image_alt }}"/>
                    </div>
                    <div> Welcome, <b> {{ currentUser.username }} </b></div>
                    <div ng-switch on="currentUser.role">
                        <div ng-switch-when="admin">
                            You're admin.
                        </div>
                        <div ng-switch-when="customer">
                            You're connected as a good customer.
                        </div>
                        <div ng-switch-when="admin">
                        You're admin.
                        </div>
                        <div ng-switch-default>
                            You're not yet connected. You have a limited access.
                        </div>
                    </div>
                </div>
                          
                      </div>
                      
                   </div>
                  </div>
                </div>
                
			</header>
			
			<!-- END USER INFO !-->

			<div ng-view></div>
		</div>
