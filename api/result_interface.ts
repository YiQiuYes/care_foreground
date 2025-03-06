export interface Result {
	/* 状态码 */
	code : number;
	/* 消息 */
	msg : string;
	/* 数据 */
	data : Record<string, unknown>;
	/* 时间戳 */
	timestamp : number;
}