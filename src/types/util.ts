type User={
    isAuthenticated: boolean;
    nome: string;
    email: string;
    token: string;
    id:number
}

type BankData ={
    id:number|null,
    nome:string
}

type CategoryData ={
    id:number|null,
    nome:string
}

type AccountData = {
    id:number|null,
    bancoId:number,
    saldo:number,
    usuarioId:number,
    banco:string
}

type TransactionData={
    descricao:string,
    valor:number,
    tipo:'entrada'|'saida',
    contaId:number,
    categoriaId:number
}

export type {User,BankData,CategoryData,AccountData,TransactionData};