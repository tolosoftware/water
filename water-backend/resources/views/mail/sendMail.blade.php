<html>
<head></head>
<body style="background: black; color: white">
<h3>Client Name: {{$name}}</h3>
<h3>Date: {{$date}}</h3>
<h3>Username: {{$username}}</h3>
<p>Email: {{$email}}</p>
<p>Phone: {{$phone}}</p>
<p>Company Name: {{$companyname}}</p>
<p>City: {{$city}}</p>
@if ($logo)
    Company Logo has been Attached 
@endif
</body>
</html>
