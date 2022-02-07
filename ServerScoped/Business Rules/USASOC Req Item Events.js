/// <reference path="../types/index.d.ts" />
/// <reference path="../UsasocScCatItem.ts" />
var business_rule_sc_req_item_events;
(function (business_rule_sc_req_item_events) {
    (function executeRule(current, previous) {
        if (current.stage.changes()) {
            switch ('' + current.stage) {
                case UsasocScCatItem.STAGE_PROCUREMENT:
                    if (gs.nil(previous) || previous.stage != UsasocScCatItem.STAGE_BACKORDERED)
                        gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_APPROVED, current, current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : previous.stage);
                    break;
                case UsasocScCatItem.STAGE_BACKORDERED:
                    gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_BACKORDERED, current, current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : previous.stage);
                    break;
                case UsasocScCatItem.STAGE_FULFILLMENT:
                    if (current.variables.hw_installer_assignee_type == 'requested_for')
                        gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_RECEIVED_CUSTOMER, current, current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : previous.stage);
                    else
                        gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_RECEIVED_SD, current, current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : previous.stage);
                    break;
                case UsasocScCatItem.STAGE_REQUEST_CANCELLED:
                    gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_CANCELED, current, current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : previous.stage);
                    break;
                case UsasocScCatItem.STAGE_COMPLETE:
                    gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_COMPLETED, current, current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : previous.stage);
                    break;
                case UsasocScCatItem.STAGE_WAITING_FOR_APPROVAL:
                    if (!current.approval.changesFrom("not requested"))
                        gs.eventQueue(UsasocScCatItem.EVENT_NAME_REQ_ITEM_REJECTED, current, current.stage, (gs.nil(previous) || gs.nil(previous.stage)) ? '' : previous.stage);
            }
        }
    })(current, previous);
})(business_rule_sc_req_item_events || (business_rule_sc_req_item_events = {}));
