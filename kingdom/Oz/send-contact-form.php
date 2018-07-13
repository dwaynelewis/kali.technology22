<?php

// Retreiving Contact Form Fields
$fullname = $_GET['fullname'];
$subject = $_GET['subject'];
$message = $_GET['message'];
$email = $_GET['email'];

// Send Email
$to = $_GET['email'];
$from = 'contact@linxtheme.com';
$subject = $subject;
$message = '<b>'.$fullname.'</b> has sent you a message from you website:<br />
			<p style="padding:20px;background:#F8F8F8;border-left:5px solid #DDDDDD;">'.stripslashes($message).'<p>
			<br />If you want to contact the client <a href="mailto:'.$email.'">'.$email.'</a>';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
$headers .= "From: SiRA! <no-reply@linxtheme.com>" . "\r\n" .
$headers .= "Reply-To: contact@linxtheme.com" . "\r\n" .
$headers .= "X-Mailer: PHP/" . phpversion();

$ok = @mail($to, $subject, $message, $headers, "-f " . $from);
?>
