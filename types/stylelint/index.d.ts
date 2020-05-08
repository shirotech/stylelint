declare module 'stylelint' {
	import { Result, ResultMessage, WarningOptions, Warning } from 'postcss';

	export type StylelintConfigExtends = string | string[];
	export type StylelintConfigPlugins = string | string[];
	export type StylelintConfigProcessor = string | [string, Record<string, unknown>];
	export type StylelintConfigProcessors = string | StylelintConfigProcessor[];
	export type StylelintConfigIgnoreFiles = string | string[];
	export type StylelintConfigRuleSettings = any | [any, Record<string, unknown>];
	export type StylelintConfigRules = {
		[ruleName: string]: StylelintConfigRuleSettings;
	};

	export type StylelintConfig = {
		extends?: StylelintConfigExtends;
		plugins?: StylelintConfigPlugins;
		pluginFunctions?: {
			[pluginName: string]: Function;
		};
		processors?: StylelintConfigProcessors;
		processorFunctions?: Function[];
		ignoreFiles?: StylelintConfigIgnoreFiles;
		ignorePatterns?: string;
		rules?: StylelintConfigRules;
		codeProcessors?: Function[];
		resultProcessors?: Function[];
		quiet?: boolean;
		defaultSeverity?: string;
	};

	export type CosmiconfigResult = { config: StylelintConfig; filepath: string };

	export type DisabledRange = {
		start: number;
		strictStart: boolean;
		end?: number;
		strictEnd?: boolean;
		rules?: string[];
	};

	export type DisabledRangeObject = {
		[ruleName: string]: DisabledRange[];
	};

	export type StylelintPostcssResult = {
		ruleSeverities: { [k: string]: any };
		customMessages: { [k: string]: any };
		quiet?: boolean;
		disabledRanges: DisabledRangeObject;
		ignored?: boolean;
		ignoreDisables?: boolean;
		stylelintError?: boolean;
		disableWritingFix?: boolean;
	};

	type EmptyResult = {
		root: {
			nodes?: undefined;
			source: {
				lang?: undefined;
				input: {
					file?: string;
				};
			};
		};
		messages: ResultMessage[];
		opts: undefined;
	};

	export type StylelintWarningOptions = WarningOptions & {
		stylelintType?: string;
		severity?: string;
		rule?: string;
	};

	export type PostcssResult = (Result | EmptyResult) & {
		stylelint: StylelintPostcssResult;
		warn: (message: string, options?: StylelintWarningOptions) => void;
	};

	export type StylelintOptions = {
		config?: StylelintConfig;
		configFile?: string;
		configBasedir?: string;
		configOverrides?: Record<string, unknown>;
		ignoreDisables?: boolean;
		ignorePath?: string;
		reportInvalidScopeDisables?: boolean;
		reportNeedlessDisables?: boolean;
		syntax?: string;
		customSyntax?: string;
		fix?: boolean;
	};

	export type GetPostcssOptions = {
		code?: string;
		codeFilename?: string;
		filePath?: string;
		codeProcessors?: Function[];
		syntax?: string;
		customSyntax?: string;
	};

	export type GetLintSourceOptions = GetPostcssOptions & { existingPostcssResult?: Result };

	export type StylelintInternalApi = {
		_options: StylelintStandaloneOptions;
		_extendExplorer: {
			search: (s: string) => Promise<null | CosmiconfigResult>;
			load: (s: string) => Promise<null | CosmiconfigResult>;
		};
		_fullExplorer: {
			search: (s: string) => Promise<null | CosmiconfigResult>;
			load: (s: string) => Promise<null | CosmiconfigResult>;
		};
		_configCache: Map<string, Record<string, unknown>>;
		_specifiedConfigCache: Map<StylelintConfig, Record<string, unknown>>;
		_postcssResultCache: Map<string, Result>;

		_getPostcssResult: (options?: GetPostcssOptions) => Promise<Result>;
		_lintSource: (options: GetLintSourceOptions) => Promise<PostcssResult>;
		_createStylelintResult: Function;
		_createEmptyPostcssResult?: Function;

		getConfigForFile: (s?: string) => Promise<{ config: StylelintConfig; filepath: string } | null>;
		isPathIgnored: (s?: string) => Promise<boolean>;
		lintSource: Function;
	};

	export type StylelintStandaloneOptions = {
		files?: string | string[];
		globbyOptions?: Record<string, unknown>;
		cache?: boolean;
		cacheLocation?: string;
		code?: string;
		codeFilename?: string;
		config?: StylelintConfig;
		configFile?: string;
		configBasedir?: string;
		configOverrides?: Record<string, unknown>;
		printConfig?: string;
		ignoreDisables?: boolean;
		ignorePath?: string;
		ignorePattern?: RegExp;
		reportNeedlessDisables?: boolean;
		reportInvalidScopeDisables?: boolean;
		maxWarnings?: number;
		syntax?: string;
		customSyntax?: string;
		formatter?: 'compact' | 'json' | 'string' | 'unix' | 'verbose' | Function;
		disableDefaultIgnores?: boolean;
		fix?: boolean;
		allowEmptyInput?: boolean;
	};

	export type StylelintCssSyntaxError = {
		column: number;
		file?: string;
		input: {
			column: number;
			file?: string;
			line: number;
			source: string;
		};
		line: number;
		message: string;
		name: string;
		reason: string;
		source: string;
	};

	export type StylelintWarning = {
		line: number;
		column: number;
		rule: string;
		severity: string;
		text: string;
		stylelintType?: string;
	};

	export type StylelintResult = {
		source?: string;
		deprecations: Array<{
			text: string;
			reference: string;
		}>;
		invalidOptionWarnings: Array<{
			text: string;
		}>;
		parseErrors: Array<Warning & { stylelintType: string }>;
		errored?: boolean;
		warnings: StylelintWarning[];
		ignored?: boolean;
		_postcssResult?: PostcssResult;
	};

	export type UnusedRange = {
		unusedRule: string;
		start: number;
		end?: number;
	};

	export type RangeType = DisabledRange & { used?: boolean };

	export type StylelintDisableReportEntry = {
		source?: string;
		ranges: Array<{
			unusedRule: string;
			start: number;
			end?: number;
		}>;
	};

	export type StylelintStandaloneReturnValue = {
		results: StylelintResult[];
		errored: boolean;
		output: any;
		maxWarningsExceeded?: {
			maxWarnings: number;
			foundWarnings: number;
		};
		needlessDisables?: StylelintDisableOptionsReport;
		invalidScopeDisables?: StylelintDisableOptionsReport;
	};

	export type StylelintPublicAPI = {
		lint: Function;
		rules: { [k: string]: any };
		formatters: { [k: string]: Function };
		createPlugin: Function;
		createLinter: Function;
		utils: {
			report: Function;
			ruleMessages: Function;
			validateOptions: Function;
			checkAgainstRule: Function;
		};
	};

	export type StylelintDisableOptionsReport = StylelintDisableReportEntry[];
}
