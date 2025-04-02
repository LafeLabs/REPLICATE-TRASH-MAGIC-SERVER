# [MINIWEB](https://github.com/LafeLabs/REPLICATE-TRASH-MAGIC-SERVER/tree/main/MINIWEB)


THIS IS A MINIMAL SET OF SELF-REPLICATING FILES WHICH PROPAGATE ON THE CLIENT SIDE OF A WEB BROWSER AS LONG AS THEY ARE INSTALLED ON A SERVER WITH OPEN PERMISSIONS!

REPLICATE THE WEB PAGES FROM SERVER TO SERVER!

RELICATE THE WEB PAGES DOWN INTO A FRACTAL TREE OF FORKS!

BUILD THE TRASH MAGIC TREE!

EDIT THE WEB PAGE LIVE IN THE BROWSER!

COPY IT LIVE IN THE BROWSER!

EDIT THE COPY LIVE IN THE BROWSER!

 - [index.html](index.html)
 - [webeditor.html](webeditor.html)
 - [readme.html](readme.html)
 - [editor.php](editor.php)
 - [edit.html](edit.html)


THIS IS THE LIST OF FILES WHICH ARE REPLICATED!

THIS IS A SELF-REPLICATING SET OF FILES!

THE ORGANIC WEB!


### [data/dna.txt](data/dna.txt)

```
{
    "html": [
        "README.md",
        "edit.html",
        "fork.html",
        "index.html",
        "readme.html",
        "webdestroyer.html",
        "webeditor.html"
    ],
    "data": [
        "dna.txt"
    ],
    "php": [
        "copy.txt",
        "deletefile.txt",
        "dir.txt",
        "dnagenerator.txt",
        "editor.txt",
        "fileloader.txt",
        "filesaver.txt",
        "local-replicator.txt",
        "mkdir.txt",
        "rdelete.txt",
        "replicator.txt",
        "text2php.txt"
    ]
}
```
 
### [php/replicator.txt](php/replicator.txt)

THE REPLICATOR REPLICATES THE SET! THE SET IS LISTED IN dna.txt, WHICH IS IN [JSON](https://en.wikipedia.org/wiki/JSON) FORMAT!

```
<?php

$dnaurl = "https://raw.githubusercontent.com/LafeLabs/REPLICATE-TRASH-MAGIC-SERVER/refs/heads/main/MINIWEB/data/dna.txt";

if(isset($_GET["dna"])){
    $dnaurl = $_GET["dna"];
}

$baseurl = explode("data/",$dnaurl)[0];
$dnaraw = file_get_contents($dnaurl);
$dna = json_decode($dnaraw);

mkdir("data");
mkdir("php");

copy("https://raw.githubusercontent.com/LafeLabs/REPLICATE-TRASH-MAGIC-SERVER/refs/heads/main/MINIWEB/php/replicator.txt","replicator.php");


foreach($dna->html as $value){
    
    copy($baseurl.$value,$value);

}


foreach($dna->data as $value){
    
    copy($baseurl."data/".$value,"data/".$value);
    
}

foreach($dna->php as $value){
 
    copy($baseurl."php/".$value,"php/".$value);
    copy($baseurl."php/".$value,explode(".",$value)[0].".php");

}

?>
<a href = "index.html">CLICK ME(3/3)</a>
<style>
body{
    background-color:BLACK;
    font-family:Comic Sans MS;
    font-size:3em;
}
a{
        font-size:3em;
        color:#ff2cb4;

}
</style>

```

THE DNA FILE IS CREATED USING dnagenerator.php:

### [php/dnagenerator.txt](php/dnagenerator.txt)

```
<!-- 
this program generates the file data/dna.txt
dna.txt is a json formatted file which points to all the files in this system, which is then used by replciator.php to copy the whole thing.  The file names are local, so that the replicator can work when pointed at any address where this system lives, which could be any new instance, so that the system can replicate without any reference to some centralized repository such as one on github. 
-->
<a href = "editor.php">editor.php</a>
<p></p>
<a href = "index.html">index.html</a>

<br/>
<pre>
<?php

    $files = scandir(getcwd());
    $phpfiles = scandir(getcwd()."/php");
    $datafiles = scandir(getcwd()."/data");

    
    $htmlfiles = [];
    foreach($files as $value){
        if(substr($value,-4) == ".txt" || substr($value,-4) == ".css" || substr($value,-5) == ".html" || substr($value,-3) == ".md" || substr($value,-3) == ".py" || substr($value,-3) == ".sh" || substr($value,-3) == ".js"){
            array_push($htmlfiles,$value);
        }
    }

    $dna = json_decode("{}");
    $dna->html = $htmlfiles;


    $dna->data = [];
    foreach($datafiles as $value){
        if($value[0] != "."){

            if(substr($value,-4) == ".txt"){
                array_push($dna->data,$value);
            }
            
        }
    }

    $dna->php = [];
    foreach($phpfiles as $value){
        if($value[0] != "."){
            array_push($dna->php,$value);
        }
    }



    echo json_encode($dna,JSON_PRETTY_PRINT);

    $file = fopen("data/dna.txt","w");// create new file with this name
    fwrite($file,json_encode($dna,JSON_PRETTY_PRINT)); //write data to file
    fclose($file);  //close file

?>
</pre>


```

