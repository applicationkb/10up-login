<?php
/*
Plugin Name: 10up Login
Description: Give the login screen a client-specific look and feel.
Author: Katelynn M. Barlowe
*/

defined( 'ABSPATH' ) or exit;

function tenup_icon() { ?>
    <link rel="shortcut icon" href="<?php echo plugins_url( 'images/favicon.ico', __FILE__);?>"/>
<?php }
add_action( 'login_head', 'tenup_icon' );

function tenup_scripts() { 
    // Styles
	wp_enqueue_style( '10up-google-fonts', 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500|Merriweather:300,300i', false );  
    wp_enqueue_style( '10up-login-style', plugins_url( 'css/style.css', __FILE__) );
	
    // Scripts
	wp_enqueue_script( 'jquery' );	
    wp_enqueue_script( '10up-login-script', plugins_url( 'js/custom.js', __FILE__) );
}
add_action( 'login_enqueue_scripts', 'tenup_scripts' );


function tenup_header() { ?>
	<div class="modal">
		<div class="inner">
			<form name="lostpasswordform" id="lostpasswordform" action="<?php echo esc_url( network_site_url( 'wp-login.php?action=lostpassword', 'login_post' ) ); ?>" method="post">
				<p>
					<label for="user_login2" ><?php _e( 'Username or Email Address' ); ?><br />
					<input type="text" name="user_login" id="user_login2" class="input" value="<?php echo esc_attr($user_login); ?>" size="20" /></label>
				</p>
				<input type="hidden" name="redirect_to" value="<?php echo esc_attr( $redirect_to ); ?>" />
				<p class="submit"><input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="<?php esc_attr_e('Get New Password'); ?>" /></p>
			</form>					
		</div>
	</div>
	<div class="modal-mask"></div>
	<div id="wrapper">
   <?php
}
add_action( 'login_header', 'tenup_header' );


function tenup_footer() { ?>
	</div> <!-- End #wrapper -->
   <?php
}
add_action( 'login_footer', 'tenup_footer' );


function tenup_pass_user_data($user_login, $user) {    
    $current_user = wp_get_current_user();
    echo '<div id="name">' . $user->user_firstname . '</div>';    
    echo '<div id="username">' . $user->user_login  . '</div>';    
    exit;
}
add_action('wp_login', 'tenup_pass_user_data',10,2);