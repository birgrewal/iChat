<?php

function disInfect($str){
    $str = str_replace('&','&amp;', $str );
    $str = str_replace('>','&gt;', $str );
    $str = str_replace('<','&lt;', $str );
    $str = str_replace('"','&quot;', $str );
    $str = str_replace("'",'&#039;', $str );
    return $str;
}

?>