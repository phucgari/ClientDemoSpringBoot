function printCustomer() {
    $.ajax({
        type: "GET",
        url:"http://localhost:8080/customer/all",
        success: function(data) {
            let content = "";
            content +=
                "    <tr>\n" +
                "        <th>FirstName</th>\n" +
                "        <th>LastName</th>\n" +
                "        <th>Delete</th>\n" +
                "    </tr>";
            data.forEach(function (customer){
                content+=
                    "<tr>" +
                    "    <td>"+customer.firstName+"</td>" +
                    "    <td>"+customer.lastName+"</td>" +
                    "    <td><button onclick='deleteCustomer("
                    +customer.id+
                    ")'>DeleteCustomer</button></td>" +
                    "</tr>"
            })
            document.getElementById("table").innerHTML=content
        }
    })
}
function deleteCustomer(id){
    $.ajax({
        type:"DELETE",
        url:"http://localhost:8080/customer/delete/"+id,
        success:printCustomer
    })
}
function createCustomer(){
    let firstName= document.getElementById("firstName").value;
    let lastName= document.getElementById("lastName").value;
    let newUser={
        firstName:firstName,
        lastName:lastName
    }
    $.ajax({
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        type:"POST",
        data:JSON.stringify(newUser),
        url:"http://localhost:8080/customer/save",
        success:printCustomer
    })
}
printCustomer()