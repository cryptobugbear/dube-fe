import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarSize,
  Button,
  ButtonDesign,
  Card,
  FlexibleColumnLayout,
  FCLLayout,
  FlexBox,
  FlexBoxDirection,
  StandardListItem,
  Label,
  List,
  Text,
  Title,
  Toolbar,
  ToolbarSpacer,
  ToolbarDesign,
} from "@ui5/webcomponents-react"; // loads ui5-button wrapped in a ui5-webcomponents-react component
import { Asset, WorkOrder } from "types";
import { AssetTypes, WorkOrderStatuses, WorkOrderTypes } from "enums";
import useAssetTypeNames from "hooks/useAssetTypeNames";
import WorkOrderBadge from "components/WorkOrderBadge";

const assets: Asset[] = [
  {
    location: "sg",
    organization: {
      name: "testorg",
      id: "1",
      members: [],
    },
    audit: {
      createdAt: "test",
      createdBy: "test",
    },
    id: "1",
    imageS3: "selocation",
    name: "Test Appliance",
    workOrders: [
      {
        id: "1",
        name: "First Work Order",
        image: "om1",
        description:
          "The Tale of the Bamboo Cutter is a monogatari containing elements of Japanese folklore. Written by an unknown author in the late 9th or early 10th century during the Heian period, it is considered the oldest surviving work in the monogatari form.",
        type: WorkOrderTypes.Appliances,
        status: WorkOrderStatuses.Closed,
      },
      {
        id: "2",
        name: "Second Work Order",
        image: "om1",
        description:
          "You can take specific actions when users sign-in or sign-out by subscribing authentication events in your app. Please see our Hub Module Developer Guide for more information.",
        type: WorkOrderTypes.Appliances,
        status: WorkOrderStatuses.Open,
      },
    ],
    type: AssetTypes.Appliances,
  },
];

interface ListPageProps {}

const ListPage: FC<ListPageProps> = () => {
  const assetNames = useAssetTypeNames();

  const navigate = useNavigate();

  const [assetId, setAssetId] = useState<Asset["id"]>(null);
  const [woId, setWoId] = useState<WorkOrder["id"]>(null);

  const asset = useMemo(() => assets.find((a) => a.id === assetId), [assetId]);
  const workOrder = useMemo(
    () => asset && asset.workOrders.find((wo) => wo.id === woId),
    [asset, woId]
  );

  const layout = useMemo(() => {
    if (workOrder) return FCLLayout.ThreeColumnsEndExpanded;
    if (asset) return FCLLayout.TwoColumnsMidExpanded;
    return FCLLayout.OneColumn;
  }, [asset, workOrder]);

  return (
    <FlexibleColumnLayout
      layout={layout}
      startColumn={
        <>
          <List
            header={
              <Toolbar design={ToolbarDesign.Solid}>
                <Title>Assets</Title>
                <ToolbarSpacer />
                <Button onClick={() => navigate("/add")}>Add</Button>
              </Toolbar>
            }
            onItemClick={(e) => setAssetId(e.detail.item.dataset.aid)}
          >
            {assets.map((a) => (
              <StandardListItem
                key={a.id}
                description={a.type}
                data-aid={a.id}
                selected={assetId === a.id}
              >
                {a.name}
              </StandardListItem>
            ))}
          </List>
        </>
      }
      midColumn={
        asset && (
          <>
            <Toolbar design={ToolbarDesign.Solid}>
              <Title>{asset.name}</Title>
              <ToolbarSpacer />
              <Button
                icon="decline"
                design={ButtonDesign.Transparent}
                onClick={() => setAssetId(null)}
              />
            </Toolbar>
            <Toolbar style={{ height: "200px" }}>
              <Avatar
                icon="video"
                size={AvatarSize.XL}
                style={{ marginLeft: "12px" }}
              >
                {asset.imageS3 && <img src={asset.imageS3} alt="" />}
              </Avatar>
              <FlexBox
                direction={FlexBoxDirection.Column}
                style={{ marginLeft: "6px" }}
              >
                <FlexBox>
                  <Label>Name:</Label>
                  <Text style={{ marginLeft: "2px" }}>{asset.name}</Text>
                </FlexBox>
                <FlexBox>
                  <Label>Genre:</Label>
                  <Text style={{ marginLeft: "2px" }}>
                    {assetNames[asset.type]}
                  </Text>
                </FlexBox>
              </FlexBox>
            </Toolbar>
            <List
              headerText="Work Orders"
              onItemClick={(e) => setWoId(e.detail.item.dataset.woid)}
            >
              {asset.workOrders.map((wo) => (
                <StandardListItem
                  key={wo.id}
                  description={wo.description}
                  data-woid={wo.id}
                  selected={woId === wo.id}
                >
                  {wo.name}
                  <WorkOrderBadge workOrder={wo} />
                </StandardListItem>
              ))}
            </List>
          </>
        )
      }
      endColumn={
        workOrder && (
          <>
            <Toolbar design={ToolbarDesign.Solid}>
              <Title>{workOrder.name}</Title>
              <WorkOrderBadge workOrder={workOrder} />
              <ToolbarSpacer />
              <Button
                icon="decline"
                design={ButtonDesign.Transparent}
                onClick={() => setWoId(null)}
              />
            </Toolbar>
            <Card>
              <Text style={{ padding: 16 }}>{workOrder.description}</Text>
            </Card>
          </>
        )
      }
    />
  );
};

export default ListPage;
