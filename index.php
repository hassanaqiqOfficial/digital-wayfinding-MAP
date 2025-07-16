<?php

    /**
     * Plugin Name:       Wayfinding
     * Plugin URI:        /wayfinding/
     * Description:       This is an advanced level of wayfinding digital signage custom plugin.
     * Version:           1.0
     * Requires at least: 5.2
     * Requires PHP:      7.2
     * Author:            BWI Aireport
     * License:           GPL v2 or later
    */ 

    namespace plugin_wayfinder;
    use plugin_wayfinder\src\Wayfinding;

    include('src/Wayfinding.php');
    require_once('vendor/autoload.php');
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    define( 'WAY_FINDING_PLUGIN_DIR' , \plugin_dir_path( __FILE__ ) );

    // Plugin main class initiated
    $wayfinding = new Wayfinding();
    // Initialize $page variable
$page = '';

    if(isset($_GET['page']) && $_GET['page'] != ''){
        $page = $_GET['page'];
    }

    switch ($page){
        case 'update_wayfinding': {
            $table = 'wp_wayfinding';
            if(isset($_GET['action']) && ($_GET['action'] == 'add' || $_GET['action'] == 'update')){
                if($_GET['action'] == 'update'){
                    $wayfinding->wayfinding_data_update($table,$_POST,$_GET['id']);
                }
                else{
                    $wayfinding->wayfinding_data_update($table,$_POST);
                }
            }
            break;
        }
        default : 
            //Default values to place.
        break;
    }
    
    /* Initialize when plugin activates. */ 
    function wayfinding_prefix_activate() {   
        initialize_wayfinding_db_table("wayfinding");
    }
    register_activation_hook(__FILE__,'plugin_wayfinder\wayfinding_prefix_activate');

    
    /* Initialize when plugin deactivates.*/
    function wayfinding_prefix_deactivate() {
        //Something is upcomming
    }
    register_deactivation_hook(__FILE__,'plugin_wayfinder\wayfinding_prefix_deactivate');


    /*Initialize when plugin deletes.*/
    function wayfinding_prefix_uninstalled(){
        drop_wayfinding_db_table("wayfinding");
    }
    register_uninstall_hook(__FILE__, 'plugin_wayfinder\wayfinding_prefix_uninstalled');


    /* Create new wayfinding table when plugin activates.*/
    function initialize_wayfinding_db_table ($table) {
        
        global $wpdb;
        $table_name = $wpdb->prefix . $table; 
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        filter_label varchar(255) NOT NULL,
        pdf_label varchar(255) NOT NULL,
        upper_level_pdf text NOT NULL,
        lower_level_pdf text NOT NULL,
        date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        PRIMARY KEY  (id)
        ) $charset_collate;";
        dbDelta( $sql );
    }


    /* Drop existing wayfinding table when plugin deletes.*/
    function drop_wayfinding_db_table($table){
        
        global $wpdb;
        $table_name = $wpdb->prefix . $table; 
        
        $sql = "DROP TABLE IF EXISTS $table_name;";
        $wpdb->query($sql);
    }
  
        
?>
