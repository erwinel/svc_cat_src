/// <reference path="../types/index.d.ts" />
/// <reference path="../UsasocScCatItem.ts" />

namespace business_rule_sc_req_item_events {
	declare var current: IUsasocHWRequestItemGlideRecord;
	declare var previous: IUsasocHWRequestItemGlideRecord | null | undefined;

	(function executeRule(current: IUsasocHWRequestItemGlideRecord, previous?: IUsasocHWRequestItemGlideRecord | null) {
		if ((<IGlideElement>current.stage).changes()) {
			switch ('' + current.stage) {
				case UsasocScCatItem.STAGE_PROCUREMENT:
					if (gs.nil(previous) || previous.stage != UsasocScCatItem.STAGE_BACKORDERED)
						gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_APPROVED, current, <string>current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : <string>previous.stage);
					break;
				case UsasocScCatItem.STAGE_BACKORDERED:
					gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_BACKORDERED, current, <string>current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : <string>previous.stage);
					break;
				case UsasocScCatItem.STAGE_FULFILLMENT:
					if (current.variables.hw_installer_assignee_type == 'requested_for')
						gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_RECEIVED_CUSTOMER, current, <string>current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : <string>previous.stage);
					else
						gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_RECEIVED_SD, current, <string>current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : <string>previous.stage);
					break;
				case UsasocScCatItem.STAGE_REQUEST_CANCELLED:
					gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_CANCELED, current, <string>current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : <string>previous.stage);
					break;
				case UsasocScCatItem.STAGE_COMPLETE:
					gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_COMPLETED, current, <string>current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : <string>previous.stage);
					break;
				case UsasocScCatItem.STAGE_WAITING_FOR_APPROVAL:
					if (!(<IGlideElement>current.approval).changesFrom("not requested"))
						gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_REJECTED, current, <string>current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : <string>previous.stage);
			}
		}
	})(current, previous);
}
