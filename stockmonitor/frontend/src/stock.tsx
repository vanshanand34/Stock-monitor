
export interface Stock{
    symbol : string,
    latest_value : string,
    change : string
}

export interface RegistrationForm{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
    username: string;
}

export interface LoginForm{
    username:string,
    password:string
}