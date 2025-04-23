
export interface Stock {
    symbol: string,
    latest_value: string,
    change: string
}

export interface RegistrationForm {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
    username: string;
}

export interface LoginForm {
    username: string,
    password: string
}

export interface Additem {
    symbol: string
}

export interface Heading {
    heading: string
}

export interface DeleteDialogProps {
    isOpen: boolean,
    handleClose: () => void,
    deleteStock: (event: React.MouseEvent<HTMLElement>) => void,
}