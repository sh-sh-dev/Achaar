# Achaar response codes
### Authentication:  `-1{a}{b}`
###### `-11{a}`: **Sign up** errors
- `-110`: user exists

###### `-12{a}`: **Sign in** errors
- `-120`: user does'nt exist
- `-121`: wrong password for user

###### `-13{a}`: **Token** problems
- `-130`: wrong token (not matching the token template)
- `-131`: token not found in the database
