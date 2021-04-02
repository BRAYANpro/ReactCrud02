
<?php
include 'BD/BD.php';

header("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="SELECT * from frameworks where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="SELECT * from frameworks";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre=$_POST['nombre'];
    $lanzamiento=$_POST['lanzamiento'];
    $desarrollador=$_POST['desarrollador'];
   $query="INSERT into frameworks(nombre, lanzamiento, desarrollador) values('$nombre', '$lanzamiento', '$desarrollador')";
   $queryAutoIncrement="SELECT MAX(id) as id from frameworks";
   $resultados=metodoPost($query, $queryAutoIncrement);
   echo json_encode($resultados);
   header("HTTP/1.1 200 ok");
    exit();
}
if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $lanzamiento=$_POST['lanzamiento'];
    $desarrollador=$_POST['desarrollador'];
    $query="UPDATE frameworks SET nombre='$nombre', lanzamiento='$lanzamiento', desarrollador='$desarrollador' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}
if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
   $query="DELETE FROM frameworks where id='$id'";
   $resultados=metodoDelete($query);
   echo json_encode($resultados);
   header("HTTP/1.1 200 ok");
    exit();
}
header("HTTP/1.1 400 Request");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: *');
?>