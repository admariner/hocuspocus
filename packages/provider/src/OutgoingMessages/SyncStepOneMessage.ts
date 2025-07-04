import * as encoding from "lib0/encoding";
import * as syncProtocol from "y-protocols/sync";
import type { OutgoingMessageArguments } from "../types.ts";
import { MessageType } from "../types.ts";
import { OutgoingMessage } from "../OutgoingMessage.ts";

export class SyncStepOneMessage extends OutgoingMessage {
	type = MessageType.Sync;

	description = "First sync step";

	get(args: Partial<OutgoingMessageArguments>) {
		if (typeof args.document === "undefined") {
			throw new Error(
				"The sync step one message requires document as an argument",
			);
		}

		encoding.writeVarString(this.encoder, args.documentName!);
		encoding.writeVarUint(this.encoder, this.type);
		syncProtocol.writeSyncStep1(this.encoder, args.document);

		return this.encoder;
	}
}
