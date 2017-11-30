<?php   
require_once('phpmailer/class.phpmailer.php');


if (isset($_POST['form-type']))
  switch ($_POST['form-type']) {
    case 'contact':
      $nome = utf8_decode($_POST['nome']);
      $telefone = utf8_decode($_POST['telefone']);
      $email = utf8_decode($_POST['email']);
      $mensagem = utf8_decode($_POST['mensagem']);
      $Subject = "Mensagem do site ENAIQ";

      $body = "<html>
        <body>
        <table border='0'>
        <tr>
          <td align=center>Mensagem do site ENAIQ
        </tr>
        <tr>
          <td>Nome: <td> ".$nome."
        </tr>
        <tr>
          <td>Telefone: <td> ".$telefone."
        </tr>
        <tr>
          <td>E-mail: <td> ".$email."
        </tr>
        <tr>
          <td>Mensagem: <td> ".$mensagem."
        </tr>
        </table>
        </body>
        </html>";
        break;
      
      case 'imprensa':
        $nome = utf8_decode($_POST['name']);
        $veiculo = utf8_decode($_POST['veiculo']);
        $editoria = utf8_decode($_POST['editoria']);
        $email = utf8_decode($_POST['email']);
        $telefone = utf8_decode($_POST['phone']);
        $Subject = "Cadastro de jornalista do site ENAIQ";

        $body = "<html>
          <body>
          <table border='0'>
          <tr>
            <td align=center>Cadastro de jornalista do site ENAIQ
          </tr>
          <tr>
            <td>Nome: <td> ".$nome."
          </tr>
          <tr>
            <td>Veiculo: <td> ".$veiculo."
          </tr>
          <tr>
            <td>Editoria: <td> ".$editoria."
          </tr>
          <tr>
            <td>Email: <td> ".$email."
          </tr>
          <tr>
            <td>Telefone: <td> ".$telefone."
          </tr>
          </table>
          </body>
          </html>";
      break;

      case 'subscribe':
        $email = utf8_decode($_POST['email']);
        $Subject = "Cadastro de newsletter do site ENAIQ";
        $body ="<html>
          <body>
          <table border='0'>
          <tr>
            <td align=center>Cadastro de newsletter do site ENAIQ
          </tr>
          <tr>
            <td>E-mail: <td> ".$email."
          </tr>
          </table>
          </body>
          </html>";
      break;
  }

$mail = new PHPMailer();
$mail->SMTPDebug = 1;
$mail->isSMTP();                                  
$mail->Host = 'outlook.office365.com';   
$mail->SMTPAuth = true;                              
$mail->Username = '';                 
$mail->Password = '';                           
$mail->SMTPSecure = 'tls';                          
$mail->Port = 587;    
$mail->Subject = $Subject;                                 

$mail->setFrom('', $Subject);
$mail->addAddress('', $Subject);      
$mail->isHTML(true);                                   

$mail->Body    = $body;

if(!$mail->send()) {
  echo 'Erro: ' . '<br />' . $mail->ErrorInfo;
  die('MF255');
} else {
    die('MF000');
}

?>