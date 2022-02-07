using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace NiceServer
{
    public static class IdentityServerConfig
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
           new IdentityResource[]
           {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
           };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("Nice_Api"),
            };

        public static IEnumerable<Client> Clients =>
             new Client[]
             {
                new Client
                {
                    ClientId = "coucou_frontend",
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris = {
                        "http://localhost:3000/callback", // for dev
                        "http://localhost:3000/silent_renew", // for dev
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "Nice_Api",
                        "offline_access"
                    },
                    RequireClientSecret = false,
                    RequirePkce = false,
                    AllowOfflineAccess = true,
                    AllowAccessTokensViaBrowser = true,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    AccessTokenLifetime = 7200, //2 hours
                    AbsoluteRefreshTokenLifetime = 2592000, //30 days
                    SlidingRefreshTokenLifetime = 1296000 //15 days
                }
             };
    }
}

