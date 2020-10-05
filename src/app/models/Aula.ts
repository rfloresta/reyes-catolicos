import { Persona } from './Persona'

export interface Aula{
    id?: number,
    capacidad?: number,
    estado?: number,
    nivel_id?: number,
    grado_id?: number,
    seccion_id?: number,
    turno_id?: number,

    //pintar
    aula_join?: string
}
