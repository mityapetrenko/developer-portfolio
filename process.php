<?php

if ( $_SERVER["REQUEST_METHOD"] == "POST" ) {

    # FIX: Replace this email with recipient email
    $mail_to = "mitya.petrenko@gmail.com";
    
    # Sender Data
    $subject = trim($_POST["subject"]);
    $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["name"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);
    $message = trim($_POST["message"]);
    
    if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($phone) OR empty($subject) OR empty($message)) {
        # Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

$content = '
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
		</head>
		<body style="font-family: Arial; color: #2c3e50; box-shadow: 0px 0px 40px 1px #f5f5f5; margin: 50px;">
			<h1 style="text-transform: uppercase; text-align: center; padding-top: 60px;">You have a new response!</h1>
			<div class="box" style="padding: 50px; box-sizing: border-box; background: #fff; margin: 0 auto;">
				<h2 style="text-transform: uppercase; margin-top: 0;">Name: '. $name . '</h2>
				<p style="margin-top: 5px;">Email: '. $email . '</p>
				<p style="margin-top: 5px;">Phone: '. $phone . '</p>
				<p style="margin-top: 5px;">Subject: '. $subject . '</p>
				<p style="margin-bottom: 25px; line-height: 2">Message: ' . $message . '</p>
			</div>
		</body>
		</html>';

    $headers  = "From: Name Of Company < petrenko.mitya@gmail.com >\n"; // Replace this info with your actual info
    $headers .= "Cc: Name Of Company < petrenko.mitya@gmail.com >\n";  // Replace this info with your actual info
    $headers .= "X-Sender: Name Of Company < petrenko.mitya@gmail.com >\n"; // Replace this info with your actual info
    $headers .= "Reply-To: < petrenko.mitya@gmail.com >\n"; // Replace this info with your actual info
    $headers .= 'X-Mailer: PHP/' . phpversion();
    $headers .= "X-Priority: 1\n"; // Urgent message!
    $headers .= "Return-Path: petrenko.mitya@gmail.com\n"; // Replace this info with your actual info
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=iso-8859-1\n";

    # Send the email.
    $success = mail($mail_to, $subject, $content, $headers);
    if ($success) {
        # Set a 200 (okay) response code.
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        # Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong, we couldn't send your message.";
    }

} else {
    # Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}