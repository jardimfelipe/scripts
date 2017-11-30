<?php  
	//define('DB_NAME', 'mamaegato1');
	//define('DB_USER', 'mamaegato1');
	//define('DB_PASSWORD', 'palito24');
	//define('DB_HOST', 'mamaegato1.mysql.dbaas.com.br');
	#define('DB_NAME', 'mamaegato1');
	#define('DB_USER', 'root');
	#define('DB_PASSWORD', '');
	#define('DB_HOST', 'localhost');
	define('DB_NAME', '');
	define('DB_USER', '');
	define('DB_PASSWORD', '');
	define('DB_HOST', '');

	$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($conn->connect_error) {
	    die("Erro de conexão" . $conn->connect_error);
	}
	$conn->query('SET NAMES utf8');
	$nome = $_POST['nome'];
	$rg = $_POST['rg'];
	$cpf = $_POST['cpf'];
	$cep = $_POST['cep'];
	$endereco = $_POST['endereco'];
	$numero = $_POST['numero'];
	$complemento = $_POST['complemento'];
	$bairro = $_POST['bairro'];
	$cidade = $_POST['cidade'];
	$estado = $_POST['estado'];
	$telefone_residencial = $_POST['telRes'];
	$telefone_comercial = $_POST['telCom'];
	$celular = $_POST['cel'];
	$email = $_POST['email'];
	$veterinario_confianca = $_POST['veterinario'];
	$nomeVet = $_POST['nomevet'];
	$numeroVet = $_POST['numerovet'];
	$contato_emergencia = $_POST['emergencia'];
	$id_dono = 0;

	$sql_cliente = "INSERT INTO clientes (nome, rg, cpf, endereco, numero, complemento, cep, bairro, cidade, estado, tel_res, tel_com, cel, email, 
					   			  veterinario, nome_veterinario,  numero_veterinario, contato)
			VALUES ('$nome', '$rg', '$cpf', '$endereco', '$numero', '$complemento', '$cep', '$bairro', '$cidade', '$estado', '$telefone_residencial', '$telefone_comercial', 
				'$celular', '$email', '$veterinario_confianca', '$nomeVet', '$numeroVet', '$contato_emergencia'); ";
	
	if ($conn->query($sql_cliente) === TRUE) {
	   $id_dono = $conn->insert_id;
	}


	$linhas = $_POST;
	$gatos = array();
	foreach( $linhas['nome-gato'] as $c => $nome_gato ){
	    $gatos[] = "('  $id_dono " . "','" . $nome_gato . "','" . $linhas['apelido'][$c] . "','" . $linhas['nascimento'][$c] . "','" . $linhas['raca'][$c] .
	   						"','" . $linhas['cor'][$c] . "','" . $linhas['sexo'][$c] . "','" . $linhas['vacinas'][$c] . "','" . $linhas['vacina'][$c] . 
	    					"','" . $linhas['antirrabica'][$c] . "','" . $linhas['castrado'][$c] . "','" . $linhas['alergia'][$c] . "','" . $linhas['qual'][$c] . 
	    					"','" . $linhas['medicacao'][$c] . "','" .$linhas['med'][$c] . "','" . $linhas['alimentacao'][$c] . "','" .$linhas['alimentacaoo'][$c] . 
	    					"','" . $linhas['teste'][$c] . "','" . $linhas['fiv'][$c] . "','" . $linhas['temperamento'][$c] . "','" . $linhas['descricao'][$c] . 
	    					"','" . $linhas['hotelzinho'][$c] .  "')";

		
	}

	$sql_gatos = "INSERT INTO gatos (";
	$sql_gatos .= "id_dono, nome, apelido, nasc, raca, ";
	$sql_gatos .= "cor, sexo, vacinas_em_dia, ultima_vacina, ";
	$sql_gatos .= "antirrabica, castrado, alergia, qual_alergia, ";
	$sql_gatos .= "medicacao, qual_medicacao, alimentacao, qual_alimentacao, ";
	$sql_gatos .= "teste, resultado_teste, temperamento, rotina, ";
	$sql_gatos .= "hotelzinho";
	$sql_gatos .= ") VALUES ";
	
		$sql_gatos .= implode(','. PHP_EOL , $gatos). ";";

	if ($conn->multi_query($sql_gatos) === TRUE) {
	    echo "Cliente Cadastrado";
	} else {
	    echo "Erro: " . $sql_gatos . $conn->error;
	}

	$conn->close();
?>