import { DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect } from 'react';
import type { Greenhouse, SensorPoint, Zone } from '../types/domain';
import type { HandoverRequest } from '../services/storage.service';

interface HandoverModalProps {
  sensor: SensorPoint | null;
  greenhouses: Greenhouse[];
  zones: Zone[];
  open: boolean;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (payload: HandoverRequest) => Promise<void>;
}

interface HandoverFormValues {
  toGreenhouseId: string;
  toZoneId: string;
  handoverAt: Dayjs;
  reason: string;
}

export const HandoverModal = ({ sensor, greenhouses, zones, open, submitting, onCancel, onSubmit }: HandoverModalProps) => {
  const [form] = Form.useForm<HandoverFormValues>();
  const greenhouseId = Form.useWatch('toGreenhouseId', form);
  const zoneOptions = zones.filter((zone) => zone.greenhouseId === greenhouseId);

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    if (!sensor) {
      return;
    }
    await onSubmit({
      sensorId: sensor.sensorId,
      toGreenhouseId: values.toGreenhouseId,
      toZoneId: values.toZoneId,
      handoverAt: values.handoverAt.format('YYYY-MM-DD HH:mm'),
      reason: values.reason.trim(),
    });
  };

  return (
    <Modal
      title={`点位交接 · ${sensor?.sensorName ?? ''}`}
      open={open}
      confirmLoading={submitting}
      okText="提交交接"
      cancelText="取消"
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      {sensor && (
        <p className="mb-3 text-sm text-slate-500">
          当前点位：{sensor.greenhouseName} · {sensor.zoneName}
          {sensor.latestHandover && `（上次交接 ${sensor.latestHandover.handoverAt}）`}
        </p>
      )}
      <Form form={form} layout="vertical">
        <Form.Item name="toGreenhouseId" label="目标温室" rules={[{ required: true, message: '请选择目标温室' }]}>
          <Select
            placeholder="选择温室"
            options={greenhouses.map((house) => ({ value: house.id, label: house.name }))}
            onChange={() => form.setFieldValue('toZoneId', undefined)}
          />
        </Form.Item>
        <Form.Item name="toZoneId" label="目标区域" rules={[{ required: true, message: '请选择目标区域' }]}>
          <Select
            placeholder={greenhouseId ? '选择区域' : '请先选择温室'}
            disabled={!greenhouseId}
            options={zoneOptions.map((zone) => ({ value: zone.id, label: zone.name }))}
          />
        </Form.Item>
        <Form.Item
          name="handoverAt"
          label="交接时间"
          rules={[
            { required: true, message: '请选择交接时间' },
            {
              validator: (_, value: Dayjs | undefined) => {
                const last = sensor?.latestHandover?.handoverAt;
                if (value && last && !value.isAfter(dayjs(last))) {
                  return Promise.reject(new Error(`交接时间必须晚于上次交接（${last}）`));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" className="w-full" />
        </Form.Item>
        <Form.Item
          name="reason"
          label="交接原因"
          extra="同一传感器重复提交时，需修改交接时间并在此说明原因"
          rules={[{ required: true, whitespace: true, message: '请填写交接原因' }]}
        >
          <Input.TextArea rows={3} placeholder="例如：育苗季开始，传感器随苗床转移到新温室" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
