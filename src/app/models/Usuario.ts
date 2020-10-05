import { Persona } from './Persona'

export interface Usuario extends Persona {
    id?: number,
    password?: string,
    estado?: number,
    tipo_usuario_id?: number,
    persona_id?: number,

    //pintar
    texto_sexo?: string,
    texto_tipo?: string
}

export interface UsuarioResponse {
    message: string,
    token: string,
    id: number,
    tipo: number,
    nombres: string
}
