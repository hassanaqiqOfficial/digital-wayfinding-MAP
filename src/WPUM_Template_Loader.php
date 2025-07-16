<?php

namespace plugin_wayfinder\src;
use plugin_wayfinder\WAY_FINDING_PLUGIN_DIR;
use plugin_wayfinder\vendor\Template_Loader\Gamajo_Template_Loader;

include(__DIR__.'/../vendor/Template_Loader/Gamajo_Template_Loader.php');

class WPUM_Template_Loader extends Gamajo_Template_Loader {
    
    public function __construct(){
      //  parent::__construct();
    }

    public function test(){
        return 'Hello world@ This is a test function.';
    }
    
    /**
     * Prefix for filter names.
     *
     * @var string
     */
    protected $filter_prefix = '';

    /**
     * Directory name where templates should be found into the theme.
     *
     * @var string
     */
    protected $theme_template_directory = 'plugin_wayfinder';

    /**
     * Current plugin's root directory.
     *
     * @var string
     */
    protected $plugin_directory = WAY_FINDING_PLUGIN_DIR;

    /**
     * Directory name of where the templates are stored into the plugin.
     *
     * @var string
     */
    protected $plugin_template_directory = 'templates';

}