import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'material-icons' },

    //Administracion IE
    { path: 'dashboard/administracion/areas', title: 'Areas Curriculares', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
    { path: 'dashboard/administracion/turnos', title: 'Turnos', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
    { path: 'dashboard/administracion/grados', title: 'Areas', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
    { path: 'dashboard/administracion/secciones', title: 'Turnos', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },

    //Gestión de clases
    { path: 'dashboard/gestion-aulas/aulas', title: 'Aulas', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
    { path: 'dashboard/gestion-aulas/aulas-en-curso', title: 'Aulas en Curso', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
    
    //Años escolares
    { path: 'dashboard/anios-escolares', title: 'Años Escolares', menuType: MenuType.LEFT, icon:'material-icons' },
    //
    
    //
    { path: 'dashboard/profesores', title: 'Profesores', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'dashboard/tipos-usuario', title: 'Tipos de Usuario', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'dashboard/usuarios', title: 'Usuarios', menuType: MenuType.LEFT, icon:'material-icons' }
];
