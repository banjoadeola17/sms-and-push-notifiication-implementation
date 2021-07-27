import type { SmsModule } from "./sms.model";
import { SmsTransporter } from "./sms.model";
import { sampleProvider } from "./sample";
import logger from "../../logger.js";

const sampleModule: SmsModule = {
    provider: sampleProvider,
};

/**
 * required modules for each sms vendors
 * @type {{provider: *, config: {}}}
 */
const providers: SmsModule[] = [sampleModule];

 // Get sms provider based on the configuration set from providers
export const smsProvider = () => {
    // current provider name that should handle sms provisions
    const currentSmsProviderName = process.env.CURRENT_SMS_PROVIDER;

    logger.info(`current provider selected is [${currentSmsProviderName}]`);

    if (
        !providers.filter(
            (module) => module.provider.name === currentSmsProviderName
        )
    ) {
        logger.error(`Provider [${currentSmsProviderName}] is not found`);
        throw `Provider [${currentSmsProviderName}] is not found`;
    }

    // get sms module using the current providers name
    const currentModule: SmsModule = providers.find(function (
        smsModule: SmsModule
    ) {
        return smsModule.provider.name === currentSmsProviderName;
    });

    // get sms module using the current providers name
    return SmsTransporter(currentModule.provider);
};
