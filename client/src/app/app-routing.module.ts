import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard, UserType } from './core';
import { LayoutComponent } from './layout/layout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'feed',
        loadChildren: () =>
          import('./pages/feed/feed.module').then((m) => m.FeedModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [UserType.user],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'community/:slug',
        loadChildren: () =>
          import('./pages/community/community.module').then(
            (m) => m.CommunityModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [UserType.admin.toString(), UserType.superAdmin.toString()],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'no-comment',
        loadChildren: () =>
          import('./pages/no-comment/no-comment.module').then((m) => m.NoCommentModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [UserType.admin.toString(), UserType.superAdmin.toString()],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./pages/reports/reports.module').then((m) => m.ReportsModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [UserType.admin.toString(), UserType.superAdmin.toString()],
            redirectTo: '/access-denied',
          },
        },
      },

      {
        path: 'post/:slug',
        loadChildren: () =>
          import('./pages/post/post.module').then((m) => m.PostModule),
      },
      {
        path: 'access-denied',
        loadChildren: () =>
          import('./pages/access-denied/access-denied.module').then(
            (m) => m.AccessDeniedModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [UserType.user.toString()],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'academic-category',
        loadChildren: () =>
          import('./pages/academic-category/academic-category.module').then(
            (m) => m.AcademicCategoryModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [UserType.admin, UserType.superAdmin],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./pages/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
