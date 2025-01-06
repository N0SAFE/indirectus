import { DirectoryGenerator } from "@/lib/templating/generator/struct/directory.generator";
import { Registry } from "@/types/registry";
import itemCommandGenerator from "./item/index.commands.generator";
import { TemplateRenderer } from "@/types/template";
import directusActivityGenerator from "./system/DirectusActivity.commands.generator";
import directusCollectionGenerator from "./system/DirectusCollection.commands.generator";
import directusDashboardGenerator from "./system/DirectusDashboard.commands.generator";
import directusExtensionGenerator from "./system/DirectusExtension.commands.generator";
import directusFieldGenerator from "./system/DirectusField.commands.generator";
import directusFileGenerator from "./system/DirectusFile.commands.generator";
import directusFlowGenerator from "./system/DirectusFlow.commands.generator";
import directusFolderGenerator from "./system/DirectusFolder.commands.generator";
import directusNotificationGenerator from "./system/DirectusNotification.commands.generator";
import directusOperationGenerator from "./system/DirectusOperation.commands.generator";
import directusPanelGenerator from "./system/DirectusPanel.commands.generator";
import directusPermissionGenerator from "./system/DirectusPermission.commands.generator";
import directusPolicyGenerator from "./system/DirectusPolicy.commands.generator";
import directusPresetGenerator from "./system/DirectusPreset.commands.generator";
import directusRelationGenerator from "./system/DirectusRelation.commands.generator";
import directusRevisionGenerator from "./system/DirectusRevision.commands.generator";
import directusRoleGenerator from "./system/DirectusRole.commands.generator";
import directusSettingsGenerator from "./system/DirectusSettings.commands.generator";
import directusShareGenerator from "./system/DirectusShare.commands.generator";
import directusTranslationGenerator from "./system/DirectusTranslation.commands.generator";
import directusUserGenerator from "./system/DirectusUser.commands.generator";
import directusVersionGenerator from "./system/DirectusVersion.commands.generator";
import directusWebhookGenerator from "./system/DirectusWebhook.commands.generator";
import { snakeToPascal } from "./system/generics";
import { RecursiveGet } from "@/lib/templating/generator/utils";

export const systemCommandGenerators = {
    DirectusActivity: directusActivityGenerator(),
    DirectusCollection: directusCollectionGenerator(),
    DirectusDashboard: directusDashboardGenerator(),
    DirectusExtension: directusExtensionGenerator(),
    DirectusField: directusFieldGenerator(),
    DirectusFile: directusFileGenerator(),
    DirectusFlow: directusFlowGenerator(),
    DirectusFolder: directusFolderGenerator(),
    DirectusNotification: directusNotificationGenerator(),
    DirectusOperation: directusOperationGenerator(),
    DirectusPanel: directusPanelGenerator(),
    DirectusPermission: directusPermissionGenerator(),
    DirectusPolicy: directusPolicyGenerator(),
    DirectusPreset: directusPresetGenerator(),
    DirectusRelation: directusRelationGenerator(),
    DirectusRevision: directusRevisionGenerator(),
    DirectusRole: directusRoleGenerator(),
    DirectusSettings: directusSettingsGenerator(),
    DirectusShare: directusShareGenerator(),
    DirectusTranslation: directusTranslationGenerator(),
    DirectusUser: directusUserGenerator(),
    DirectusVersion: directusVersionGenerator(),
    DirectusWebhook: directusWebhookGenerator(),
};

export default (
    registry: Registry,
    {
        ctx,
        renderer,
    }: {
        ctx: Record<string, unknown>;
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
