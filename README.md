# MVC Ng Library Built in DotNetCore 8 and Angular

This is a simple library management system built in DotNetCore 8 and Angular. It is a simple project to demonstrate the use of MVC architecture in DotNetCore 8 and Angular.

## Setup
1. If you haven't already installed user secrets, run `dotnet user-secrets init` in the project directory.
1. Create App Secret. Right click on project, click 'manage user secrets' to open secrets.json. Add `"ConnectionStrings:DefaultConnection"` with value for SQL Server connection string. Example: `"Data Source=<servername>;Persist Security Info=True;Initial Catalog=<DbName>;User Id=<userid>;Password=<password>;Trust Server Certificate=True;"`
1. Make sure SQL Server is in mixed authentication mode (Right click server -> Properties, Security, Server Authentication -> SQL Server and Windows Authentication).
1. Create a SQL Server user with DB Create privileges.
1. Run application, it will create database.