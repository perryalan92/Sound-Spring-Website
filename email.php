<?php

if(isset($_POST['submit'])){
    $msg = 'Name: '.$_POST['name']."\n".
        'Email: ' .$_POST['email'] ."\n".
        'Comment: ' .$_POST['comments'];
    mail(
        'perryaj@plu.edu',
        'Potential new customer: '.$_POST['name'],
        $msg   
    );
} else {
    header('location: experimental.html');
    exit(0);
}


?>