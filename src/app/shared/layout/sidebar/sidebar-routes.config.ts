import { MenuType, RouteInfo } from './sidebar.metadata';
        
export const ROUTES: RouteInfo[] = [
//-------------ADMINISTRADOR/COORDINADOR-----------------------------------------
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'material-icons' },
    //Administracion IE
        { path: 'dashboard/administracion/areas-curriculares', title: 'Areas Curriculares', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
        { path: 'dashboard/administracion/aulas', title: 'Aulas', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
        { path: 'dashboard/administracion/secciones', title: 'Secciones', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },

    { path: 'dashboard/aulas-en-curso', title: 'Aulas en Curso', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'dashboard/anios-escolares', title: 'Años Escolares', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'dashboard/usuarios', title: 'Usuarios', menuType: MenuType.LEFT, icon:'material-icons' },
//------------------------------------------------------------------------------------

//-------------PROFESOR/ESTUDIANTE----------------------------------------------------

{ path: 'inicio', title: 'Inicio', menuType: MenuType.LEFT, icon: 'material-icons' },
{ path: 'inicio/aula-en-curso', title: 'Aula en curso', menuType: MenuType.LEFT, icon:'material-icons' },

//-------------PROFESOR----------------------------------------------------
{ path: 'informe-evidencia', title: 'Informe de Evidencia', menuType: MenuType.LEFT, icon:'material-icons' },

//------------------------------------------------------------------------------------
];
