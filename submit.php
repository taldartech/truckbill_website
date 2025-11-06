<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'mail/Exception.php';
require 'mail/PHPMailer.php';
require 'mail/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect and sanitize inputs
    $userType = htmlspecialchars(trim($_POST['userType'] ?? ''));
    $fullName = htmlspecialchars(trim($_POST['fullName'] ?? ''));
    $companyName = htmlspecialchars(trim($_POST['companyName'] ?? ''));
    $phoneNumber = htmlspecialchars(trim($_POST['phoneNumber'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    $body = '';
    $body .= 'User Type: ' . $userType . '<br>';
    $body .= 'Name: ' . $fullName . '<br>';
    $body .= 'Company Name: ' . $companyName . '<br>';
    $body .= 'Phone Number: ' . $phoneNumber . '<br>';
    $body .= 'Email: ' . $email . '<br>';
    $body .= 'Message: ' . $message;


    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'shalindevpura19@gmail.com';                 // SMTP username
        $mail->Password   = 'wutygzvuclienrno';                     // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Recipients
        $mail->setFrom('shalindevpura19@gmail.com', 'TruckBill');
        
        $mail->addAddress('support@truckbill.in');
        $mail->addCC('team@taldartechconsultancy.com');
        $mail->addReplyTo($email, $fullName);
    
        // Content
        $mail->isHTML(true);                                        // Set email format to HTML
        $mail->Subject = "Truckbill Enquiries via Website";
        $mail->Body    = $body;
        $mail->send();
        echo json_encode([
            'success' => true,
            'message' => 'Thank you, your information has been received.'
        ]);
    } catch (Exception $e) {
        $data = file_get_contents('php://input');
        $logFile = __DIR__ . '/error_log.txt';
        $logMessage = "[" . date('Y-m-d H:i:s') . "]\n" .
            "Exception: " . $e->getMessage() . "\n" .
            "File: " . $e->getFile() . "\n" .
            "Line: " . $e->getLine() . "\n" .
            "Request Data: " . $data . "\n" .
            "--------------------------\n";

        file_put_contents($logFile, $logMessage, FILE_APPEND);

        echo json_encode([
            'success' => false,
            'message' => 'Server Error'
        ]);
    }
    exit;
}

// If not a POST request
echo json_encode(['success' => false, 'message' => 'Invalid request.']);
