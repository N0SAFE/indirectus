add a helper function like select() to change the object to keep
like with the object

```typescript
type object = {
    a: string;
    b: number;
    c: boolean;
    aSub: {
        id: string
    };
    bSub: {
        id: string
    };
    cSub: {
        id: string;
    };
    dSub: {
        id: string;
        subSub: {
            id: string
        }
    };
}

select(object: object, keep: string[]): object

type keep = [
    'a', 
    'aSub',
    {
        bSub: ['id']
    }, 
    'cSub',
    {
        cSub: ['id']
    },
    {
        dSub: ['*']
    }
] // for every subObject selected it has to be an object on the entry object
type returnType = {
    a: string;
    aSub: string;
    bSub: {
        id: string
    };
    cSub: {
        id: string;
    }; // even if it as been also selected on id only ('cSub')
    dSub: {
        id: string;
        subSub: string
    }
}
```

add aggregate options to the safe bindings





create a proxied version of the TypedClient return by the function schema to handle global with options 

like that 

```typescript
const bindingsFns = {
            ...(() => {
                const requests = new SystemBinding.Requests(
                    client as any
                ) as any
                return Object.getOwnPropertyNames(
                    Object.getPrototypeOf(requests)
                ).map((n) => [n, requests[n].bind(requests)])
            })(),
            Clients: ItemBinding.ClientsItems,
            Client: ItemBinding.ClientsItem,
            Internals: ItemBinding.InternalsItems,
            Internal: ItemBinding.InternalsItem,
            ProjectStatuses: ItemBinding.ProjectStatusItems,
            ProjectStatus: ItemBinding.ProjectStatusItem,
            Projects: ItemBinding.ProjectsItems,
            Project: ItemBinding.ProjectsItem,
            ProjectsInternals: ItemBinding.ProjectsInternalsItems,
            ProjectsInternal: ItemBinding.ProjectsInternalsItem,
            RegisterLinks: ItemBinding.RegisterLinkItems,
            RegisterLink: ItemBinding.RegisterLinkItem,
            SupportedBrowsers: ItemBinding.SupportedBrowserItems,
            SupportedBrowser: ItemBinding.SupportedBrowserItem,
            SupportedOs: ItemBinding.SupportedOsItems,
            SupportedO: ItemBinding.SupportedOsItem,
            TicketConversations: ItemBinding.TicketConversationsItems,
            TicketConversation: ItemBinding.TicketConversationsItem,
            Tickets: ItemBinding.TicketsItems,
            Ticket: ItemBinding.TicketsItem,
            TicketsFiles: ItemBinding.TicketsFilesItems,
            TicketsFile: ItemBinding.TicketsFilesItem,
            DirectusActivities: SystemBinding.DirectusActivityItems,
            DirectusActivity: SystemBinding.DirectusActivityItem,
            DirectusCollections: SystemBinding.DirectusCollectionItems,
            DirectusCollection: SystemBinding.DirectusCollectionItem,
            DirectusFields: SystemBinding.DirectusFieldItems,
            DirectusField: SystemBinding.DirectusFieldItem,
            DirectusFiles: SystemBinding.DirectusFileItems,
            DirectusFile: SystemBinding.DirectusFileItem,
            DirectusFolders: SystemBinding.DirectusFolderItems,
            DirectusFolder: SystemBinding.DirectusFolderItem,
            DirectusPermissions: SystemBinding.DirectusPermissionItems,
            DirectusPermission: SystemBinding.DirectusPermissionItem,
            DirectusPolicies: SystemBinding.DirectusPolicyItems,
            DirectusPolicy: SystemBinding.DirectusPolicyItem,
            DirectusPresets: SystemBinding.DirectusPresetItems,
            DirectusPreset: SystemBinding.DirectusPresetItem,
            DirectusRelations: SystemBinding.DirectusRelationItems,
            DirectusRelation: SystemBinding.DirectusRelationItem,
            DirectusRevisions: SystemBinding.DirectusRevisionItems,
            DirectusRevision: SystemBinding.DirectusRevisionItem,
            DirectusRoles: SystemBinding.DirectusRoleItems,
            DirectusRole: SystemBinding.DirectusRoleItem,
            DirectusSettings: SystemBinding.DirectusSettingsSingleton,
            DirectusUsers: SystemBinding.DirectusUserItems,
            DirectusUser: SystemBinding.DirectusUserItem,
            DirectusWebhooks: SystemBinding.DirectusWebhookItems,
            DirectusWebhook: SystemBinding.DirectusWebhookItem,
            DirectusDashboards: SystemBinding.DirectusDashboardItems,
            DirectusDashboard: SystemBinding.DirectusDashboardItem,
            DirectusPanels: SystemBinding.DirectusPanelItems,
            DirectusPanel: SystemBinding.DirectusPanelItem,
            DirectusNotifications: SystemBinding.DirectusNotificationItems,
            DirectusNotification: SystemBinding.DirectusNotificationItem,
            DirectusShares: SystemBinding.DirectusShareItems,
            DirectusShare: SystemBinding.DirectusShareItem,
            DirectusFlows: SystemBinding.DirectusFlowItems,
            DirectusFlow: SystemBinding.DirectusFlowItem,
            DirectusOperations: SystemBinding.DirectusOperationItems,
            DirectusOperation: SystemBinding.DirectusOperationItem,
            DirectusTranslations: SystemBinding.DirectusTranslationItems,
            DirectusTranslation: SystemBinding.DirectusTranslationItem,
            DirectusExtensions: SystemBinding.DirectusExtensionItems,
            DirectusExtension: SystemBinding.DirectusExtensionItem,
            Safe: Proxier.create({
                ...(() => {
                    const requests = new SafeSystemBinding.Requests(
                        client as any
                    ) as any
                    return Object.getOwnPropertyNames(
                        Object.getPrototypeOf(requests)
                    ).map((n) => [n, requests[n].bind(requests)])
                })(),
                Clients: SafeItemBinding.ClientsItems,
                Client: SafeItemBinding.ClientsItem,
                Internals: SafeItemBinding.InternalsItems,
                Internal: SafeItemBinding.InternalsItem,
                ProjectStatuses: SafeItemBinding.ProjectStatusItems,
                ProjectStatus: SafeItemBinding.ProjectStatusItem,
                Projects: SafeItemBinding.ProjectsItems,
                Project: SafeItemBinding.ProjectsItem,
                ProjectsInternals: SafeItemBinding.ProjectsInternalsItems,
                ProjectsInternal: SafeItemBinding.ProjectsInternalsItem,
                RegisterLinks: SafeItemBinding.RegisterLinkItems,
                RegisterLink: SafeItemBinding.RegisterLinkItem,
                SupportedBrowsers: SafeItemBinding.SupportedBrowserItems,
                SupportedBrowser: SafeItemBinding.SupportedBrowserItem,
                SupportedOs: SafeItemBinding.SupportedOsItems,
                SupportedO: SafeItemBinding.SupportedOsItem,
                TicketConversations: SafeItemBinding.TicketConversationsItems,
                TicketConversation: SafeItemBinding.TicketConversationsItem,
                Tickets: SafeItemBinding.TicketsItems,
                Ticket: SafeItemBinding.TicketsItem,
                TicketsFiles: SafeItemBinding.TicketsFilesItems,
                TicketsFile: SafeItemBinding.TicketsFilesItem,
                DirectusActivities: SafeSystemBinding.DirectusActivityItems,
                DirectusActivity: SafeSystemBinding.DirectusActivityItem,
                DirectusCollections: SafeSystemBinding.DirectusCollectionItems,
                DirectusCollection: SafeSystemBinding.DirectusCollectionItem,
                DirectusFields: SafeSystemBinding.DirectusFieldItems,
                DirectusField: SafeSystemBinding.DirectusFieldItem,
                DirectusFiles: SafeSystemBinding.DirectusFileItems,
                DirectusFile: SafeSystemBinding.DirectusFileItem,
                DirectusFolders: SafeSystemBinding.DirectusFolderItems,
                DirectusFolder: SafeSystemBinding.DirectusFolderItem,
                DirectusPermissions: SafeSystemBinding.DirectusPermissionItems,
                DirectusPermission: SafeSystemBinding.DirectusPermissionItem,
                DirectusPolicies: SafeSystemBinding.DirectusPolicyItems,
                DirectusPolicy: SafeSystemBinding.DirectusPolicyItem,
                DirectusPresets: SafeSystemBinding.DirectusPresetItems,
                DirectusPreset: SafeSystemBinding.DirectusPresetItem,
                DirectusRelations: SafeSystemBinding.DirectusRelationItems,
                DirectusRelation: SafeSystemBinding.DirectusRelationItem,
                DirectusRevisions: SafeSystemBinding.DirectusRevisionItems,
                DirectusRevision: SafeSystemBinding.DirectusRevisionItem,
                DirectusRoles: SafeSystemBinding.DirectusRoleItems,
                DirectusRole: SafeSystemBinding.DirectusRoleItem,
                DirectusSettings: SafeSystemBinding.DirectusSettingsSingleton,
                DirectusUsers: SafeSystemBinding.DirectusUserItems,
                DirectusUser: SafeSystemBinding.DirectusUserItem,
                DirectusWebhooks: SafeSystemBinding.DirectusWebhookItems,
                DirectusWebhook: SafeSystemBinding.DirectusWebhookItem,
                DirectusDashboards: SafeSystemBinding.DirectusDashboardItems,
                DirectusDashboard: SafeSystemBinding.DirectusDashboardItem,
                DirectusPanels: SafeSystemBinding.DirectusPanelItems,
                DirectusPanel: SafeSystemBinding.DirectusPanelItem,
                DirectusNotifications:
                    SafeSystemBinding.DirectusNotificationItems,
                DirectusNotification:
                    SafeSystemBinding.DirectusNotificationItem,
                DirectusShares: SafeSystemBinding.DirectusShareItems,
                DirectusShare: SafeSystemBinding.DirectusShareItem,
                DirectusFlows: SafeSystemBinding.DirectusFlowItems,
                DirectusFlow: SafeSystemBinding.DirectusFlowItem,
                DirectusOperations: SafeSystemBinding.DirectusOperationItems,
                DirectusOperation: SafeSystemBinding.DirectusOperationItem,
                DirectusTranslations:
                    SafeSystemBinding.DirectusTranslationItems,
                DirectusTranslation: SafeSystemBinding.DirectusTranslationItem,
                DirectusExtensions: SafeSystemBinding.DirectusExtensionItems,
                DirectusExtension: SafeSystemBinding.DirectusExtensionItem,
            }),
        }

        const createProxiedBindings = (
            path: string[],
            defaultObject: object
        ) => {
            const getValue = (path: string[]) => {
                return path.reduce((acc, key) => (acc as any)[key], bindingsFns)
            }
            return new Proxy(
                {},
                {
                    get(_, prop: string) {
                        if (prop in bindingsFns) {
                            const value = getValue([...path, prop])
                            if (value instanceof ChainableBinding) {
                                return new (value as any)(client)
                            }
                            if (value instanceof Proxier) {
                                return createProxiedBindings(
                                    [...path, 'data', prop],
                                    {}
                                )
                            }
                            return value
                        }

                        if (prop in defaultObject) {
                            return (defaultObject as any)[prop]
                        }

                        return undefined
                    },
                }
            )
        }

        return createProxiedBindings([], {}) as TypedClient
```
&&
```typescript
class Proxier {
    constructor(public data: any) {}
    static create(data: any) {
        return new Proxier(data)
    }
}
```