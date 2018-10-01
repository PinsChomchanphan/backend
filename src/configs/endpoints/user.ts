export const enum User {
    CreateTenants = 'tenant/command/create',
    CreateUser = 'user/command/create',
    GetAllTenants = 'tenant/query/tenants',
    GetAllUsers = 'user/query/users',
    GetCurrentUser = 'user/me',
    Login = 'authentication/login',
    Revoke = 'authentication/revoke',
    RecoveryPassword = 'user/command/forgot-password-restore',
    ResetPassword = 'user/command/restore-password-by-code',
    UserInfo = 'api/userinfo',
}
