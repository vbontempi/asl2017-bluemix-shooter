<html>
	<head>
		<title>Space Shooter </title>
		<?php
     //include a javascript file
   echo "<script type='text/javascript' src='phaser.min.js'></script>";
   echo "<script type='text/javascript' src='game.js'></script>";
?>
		<style type="text/css">
		body {
			margin: 0px;
			padding: 0px;	
			background: url("bg_stars.png") no-repeat center center fixed; 	
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		}
		</style>
	</head>
	<body>
		<br/>
		<br/>
		<div id="game" align="center">
		</div>
	 </body>
</html>