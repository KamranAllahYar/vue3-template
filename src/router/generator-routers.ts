import { adminMenus } from '@/api/system/menu';
import { constantRouterIcon } from './router-icons';
import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/constant';
import type { AppRouteRecordRaw } from '@/router/types';

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('LAYOUT', Layout);

/**
 * Format backend structure information and recursively generate hierarchical routing table
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const routerGenerator = (routerMap, parent?): any[] => {
  return routerMap.map((item) => {
    const currentRouter: any = {
      // Routing address is dynamically spliced to generate such as /dashboard/workplace
      path: `${(parent && parent.path) || ''}/${item.path}`,
      // Route name, it is recommended to be unique
      name: item.name || '',
      // The component of the page corresponding to this route
      component: item.component,
      // meta: Page title, menu icon, page permission (for command permission, can be removed)
      meta: {
        ...item.meta,
        label: item.meta.title,
        icon: constantRouterIcon[item.meta.icon] || null,
        permissions: item.meta.permissions || null,
      },
    };

    // In order to prevent irregular return results from the backend, two backslashes may be spliced into the processing.
    currentRouter.path = currentRouter.path.replace('//', '/');
    // REDIRECT
    item.redirect && (currentRouter.redirect = item.redirect);
    // Whether to have submenus, and process recursively
    if (item.children && item.children.length > 0) {
      //If redirect is not defined, the default first sub-route is redirect
      !item.redirect && (currentRouter.redirect = `${item.path}/${item.children[0].path}`);
      // Recursion
      currentRouter.children = routerGenerator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * Dynamically generate menus
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => {
  return new Promise((resolve, reject) => {
    adminMenus()
      .then(({ result }) => {
        // const routeList = routerGenerator([
        //   {
        //     path: '/dashboard',
        //     name: 'dashboard',
        //     redirect: '/dashboard/content',
        //     component: 'LAYOUT',
        //     meta: {
        //       title: 'Dashboard',
        //       sort: 1,
        //     },
        //     children: [
        //       {
        //         path: 'content',
        //         name: 'dashboard-content',
        //         meta: {
        //           title: 'Dashboard',
        //         },
        //         component: '/dashboard/content/index',
        //       },
        //       {
        //         path: 'workplace',
        //         name: 'dashboard-workplace',
        //         meta: {
        //           title: 'Dashboard Workplace',
        //         },
        //         component: '/dashboard/workplace/index',
        //       },
        //     ],
        //   },
        // ]);
        asyncImportRoute(result.data);

        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Find the corresponding component file in views
 * */
let viewsModules: Record<string, () => Promise<Recordable>>;
export const asyncImportRoute = (routes: AppRouteRecordRaw[] | undefined): void => {
  viewsModules = viewsModules || import.meta.glob('../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component as string);
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(viewsModules, component as string);
      }
    } else if (name) {
      item.component = ParentLayout;
    }
    children && asyncImportRoute(children);
  });
};

/**
 * DYNAMIC IMPORT
 * */
export const dynamicImport = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) => {
  const keys = Object.keys(viewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
    return;
  }
};
