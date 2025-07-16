<?php

namespace plugin_wayfinder\src;
use Twig\Loader\FilesystemLoader;
use Twig\Environment;

include('WPUM_Template_Loader.php');


class Wayfinding extends WPUM_Template_Loader {

    protected $twig;
    protected $loader;
    protected $templateLoader;

    public function __construct(){
        $this->loader = new WPUM_Template_Loader();
        add_action('admin_menu',array($this,'wpdocs_register_custom_wayfinding'));
         if($_SERVER['REQUEST_URI'] == '/wayfinding/'){
            add_filter('page_template',array($this,'wayfinding_theme_template_loader'));
        }
       
    }

    /* Register a wayfinding menu page in admin panel. */
    function wpdocs_register_custom_wayfinding(){
        add_menu_page( 
            __( 'Wayfinding', 'textdomain' ),
            'Wayfinding',
            'manage_options',
            'update_wayfinding',
            array($this,'wayfinding_page_content_loader'),
            plugins_url( 'plugin_wayfinder/assets/icons/map2.png' ),
            5
        ); 
    }

    /* Wayfinding menu page content loader */
    public function wayfinding_page_content_loader(){

        global $wpdb;
        $emptyArr[0] = array(
            'id' => 0,
            'title' => '',
            'filter_label' => '',
            'pdf_label' => '',
            'upper_level_pdf' => '',
            'lower_level_pdf' => '',
            'field_name' => ''
        );

        $sql = "SELECT *FROM wp_wayfinding";
        $resultArr = $wpdb->get_results($sql);
        $wayfinding = !empty($resultArr) ? $resultArr[0] : $emptyArr[0];
        $wayfinding->airlines = json_decode($wayfinding->airlines);

        $loader = new WPUM_Template_Loader();
        $page_template = $loader->set_template_data($wayfinding,"wayfinding")->get_template_part( 'wayfinding' );
        \load_template($page_template,true);
    }

    public function wayfinding_theme_template_loader()
    {
        global $wpdb;
        $data = array();
        
        $sql = "SELECT *FROM wp_wayfinding";
        $data = $wpdb->get_results($sql);
        $wayfinding = $data[0];

        $templatesStaticRootDir = plugin_dir_url(__DIR__).'templates/static/';
        $templatesDir = substr(__DIR__,0,-3); 
        $pluginRootDir = plugin_dir_url(__DIR__); 
        $rootDir = get_site_url();
        $airlines = json_decode( $wayfinding->airlines );
    
        $this->templateLoader = new FileSystemLoader($templatesDir.'templates/');
        $this->twig =  new Environment($this->templateLoader);
       
        echo $this->twig->render(
            'page--html.html.twig',
                [
                    'root' => $rootDir,
                    'plugin_root'   => $pluginRootDir,
                    'static_root' => $templatesStaticRootDir,
                    'filter_by_label' => $wayfinding->filter_label,
                    'pdf_label' => $wayfinding->pdf_label,
                    'title' => $wayfinding->title,
                    'upper_level_pdf' => $wayfinding->upper_level_pdf,
                    'lower_level_pdf' => $wayfinding->upper_level_pdf,
                    'airlines'  => $airlines

                ],true
            );
    }

    public function wayfinding_data_update($table,$data,$wayfinding_id = 0){
        
        global $wpdb;
        if(isset($data['submit'])){
            unset($data['submit']);
        }
        
        if(isset($_FILES) && (isset($_FILES['upper_level_pdf']) OR isset($_FILES['lower_level_pdf']) )){   
           
            $uploaddir =  \wp_upload_dir();

            if(!is_dir($uploaddir['basedir'].'/wayfinding/maps')){
                \wp_mkdir_p($uploaddir['basedir'].'/wayfinding/maps');
            }

            $uploadfile_dir = $uploaddir['basedir'].'/wayfinding/maps/';

            if(isset($_FILES['upper_level_pdf']['name']) && $_FILES['upper_level_pdf']['name'] != ""){
                unset($data['upper_level_pdf']);

                $fileName_upperLevelMap = rand(0,1000).basename($_FILES['upper_level_pdf']['name']);
                move_uploaded_file($_FILES['upper_level_pdf']['tmp_name'], $uploadfile_dir.$fileName_upperLevelMap);
                $data['upper_level_pdf'] = $uploaddir['baseurl'].'/wayfinding/maps/'.$fileName_upperLevelMap;
            }

            if(isset($_FILES['lower_level_pdf']) && $_FILES['lower_level_pdf']['name'] != ""){
                unset($data['lower_level_pdf']);

                $fileName_lowerLevelMap = rand(0,1000).basename($_FILES['lower_level_pdf']['name']);
                move_uploaded_file($_FILES['lower_level_pdf']['tmp_name'], $uploadfile_dir.$fileName_lowerLevelMap);
                $data['lower_level_pdf'] = $uploaddir['baseurl'].'/wayfinding/maps/'.$fileName_lowerLevelMap;
            }
        }

        $data['date'] = date("Y-m-d h:i:s"); 

        if(isset($data['field_name']) && !empty($data['field_name'])){
           
            foreach($data['field_name'] as $airlineData){
                unset($data['field_name']);
                $data['field_names'][] = $airlineData;
            }
           
           $data['airlines'] = json_encode($data['field_names']);
           unset($data['field_names']);
        }

        $sql = "SELECT *FROM wp_wayfinding";
        $wayfinding = $wpdb->get_results($sql);

        if(!$wayfinding){
            $wpdb->insert($table,$data);
        }else{
            $wpdb->update($table,$data,array('id' => $wayfinding_id));
        }   
    }

} 

?>