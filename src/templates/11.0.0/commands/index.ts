import { DirectoryGenerator } from "@/lib/templating/generator/struct/directory.generator";
import { Registry } from "@/types/registry";
import itemCommandGenerator from "./item/index.commands.generator";
import { TemplateContext, TemplateRenderer } from "@/types/template";
import directusActivityGenerator from "./system/DirectusActivity.commands.generator";
import directusCollectionsGenerator from "./system/DirectusCollections.commands.generator";
import directusDashboardsGenerator from "./system/DirectusDashboards.commands.generator";
import directusExtensionsGenerator from "./system/DirectusExtensions.commands.generator";
import directusFieldsGenerator from "./system/DirectusFields.commands.generator";
import directusFilesGenerator from "./system/DirectusFiles.commands.generator";
import directusFlowsGenerator from "./system/DirectusFlows.commands.generator";
import directusFoldersGenerator from "./system/DirectusFolders.commands.generator";
import directusNotificationsGenerator from "./system/DirectusNotifications.commands.generator";
import directusOperationsGenerator from "./system/DirectusOperations.commands.generator";
import directusPanelsGenerator from "./system/DirectusPanels.commands.generator";
import directusPermissionsGenerator from "./system/DirectusPermissions.commands.generator";
import directusPolicyGenerator from "./system/DirectusPolicy.commands.generator";
import directusPresetsGenerator from "./system/DirectusPresets.commands.generator";
import directusRelationsGenerator from "./system/DirectusRelations.commands.generator";
import directusRevisionsGenerator from "./system/DirectusRevisions.commands.generator";
import directusRolesGenerator from "./system/DirectusRoles.commands.generator";
import directusSettingsGenerator from "./system/DirectusSettings.commands.generator";
import directusSharesGenerator from "./system/DirectusShares.commands.generator";
import directusTranslationsGenerator from "./system/DirectusTranslations.commands.generator";
import directusUsersGenerator from "./system/DirectusUsers.commands.generator";
import directusVersionsGenerator from "./system/DirectusVersions.commands.generator";
import directusWebhooksGenerator from "./system/DirectusWebhooks.commands.generator";
import { snakeToPascal } from "./system/generics";

export const systemCommandGenerators = {
    DirectusActivity: directusActivityGenerator(),
    DirectusCollections: directusCollectionsGenerator(),
    DirectusDashboards: directusDashboardsGenerator(),
    DirectusExtensions: directusExtensionsGenerator(),
    DirectusFields: directusFieldsGenerator(),
    DirectusFiles: directusFilesGenerator(),
    DirectusFlows: directusFlowsGenerator(),
    DirectusFolders: directusFoldersGenerator(),
    DirectusNotifications: directusNotificationsGenerator(),
    DirectusOperations: directusOperationsGenerator(),
    DirectusPanels: directusPanelsGenerator(),
    DirectusPermissions: directusPermissionsGenerator(),
    DirectusPolicy: directusPolicyGenerator(),
    DirectusPresets: directusPresetsGenerator(),
    DirectusRelations: directusRelationsGenerator(),
    DirectusRevisions: directusRevisionsGenerator(),
    DirectusRoles: directusRolesGenerator(),
    DirectusSettings: directusSettingsGenerator(),
    DirectusShares: directusSharesGenerator(),
    DirectusTranslations: directusTranslationsGenerator(),
    DirectusUsers: directusUsersGenerator(),
    DirectusVersions: directusVersionsGenerator(),
    DirectusWebhooks: directusWebhooksGenerator(),
};

export default (
    registry: Registry,
    {
        ctx,
        renderer,
    }: {
        ctx: TemplateContext;
        renderer: TemplateRenderer;
    },
) =>
    DirectoryGenerator.create<
        | (typeof systemCommandGenerators)[keyof typeof systemCommandGenerators]
        | ReturnType<typeof itemCommandGenerator>
    >({
        ...(Object.fromEntries(
            Object.entries(systemCommandGenerators).map(([name, content]) => [
                `${name}.commands.ts`,
                content,
            ]),
        ) as {
            [Key in keyof typeof systemCommandGenerators as `${Key}.commands.ts`]: (typeof systemCommandGenerators)[Key];
        }),
        ...(Object.fromEntries(
            registry.collections
                .filter((collection) => !collection.is_system)
                .map((collection) => [
                    `${snakeToPascal(collection.name.raw)}.commands.ts`,
                    itemCommandGenerator(registry, collection, {
                        ctx,
                        renderer,
                    }),
                ]),
        ) as Record<string, ReturnType<typeof itemCommandGenerator>>),
    });
