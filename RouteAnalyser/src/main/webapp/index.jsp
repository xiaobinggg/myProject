<html>
<head>
    <script src="js/jquery-1.10.2.js" type="text/javascript"></script>

    <script type="text/javascript">
        //$ = jQuery.noConflict();
        $(function(){
            var url = "/sayHello.do";
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                cache: false,
                success: function (data) {
                    alert(data);
                }
            });
        });

    </script>
</head>
<body>
<h2>Hello World!</h2>
</body>
</html>
